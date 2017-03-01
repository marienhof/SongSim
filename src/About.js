import React, { Component } from 'react';
import { Link } from 'react-router';

import './About.css';

const IMG_DIR = '/img/about/';

// TODO: maybe move chapter/section data into a separate module
const chapter_names = ['default', 'intro', 'advanced'];
const SECTION_METADATA = {
  intro: {
    panelClass: "col-xs-12"
  }
};

class About extends Component {

  renderSection = (s, chapter) => {
    let filling;
    if (s.body) {
      filling = s.body;
    } else {
      filling = s.paras.map( (p, i) => {
        if (typeof p === 'string') {
          return <p key={i}>{p}</p>;
        }
        // Otherwise assumed to be jsx returning fn
        return p(i);
      });
    }
    var panelClass = SECTION_METADATA[chapter] ? 
      SECTION_METADATA[chapter].panelClass
      : "col-lg-10 col-lg-offset-1 col-xs-12";
    panelClass += " abtPanel";
    return (
          <div key={s.img} className="section row">
            <div className={panelClass}>
              <div className="col-xs-12 col-lg-5">
                <img className="img-responsive"
                  src={process.env.PUBLIC_URL + IMG_DIR + s.img} />
              </div>
              <div className="col-xs-12 col-lg-7">
              {filling}
              </div>
            </div>
          </div>);
  }

  render() {
    var chapter = this.props.params.chapter || 'default';
    var sections = SECTIONS[chapter].map((sect) => (this.renderSection(sect, chapter)));
    var chapter_preamble;
    if (this.props.params.chapter === 'advanced') {
      chapter_preamble = (
          <p>Below are some recurring patterns to look out for.</p>
      );
    }
    return (
      <div className={`container chapter-${chapter}`}>
        <h1>About</h1>
        <ul className="nav nav-tabs">
          <li className={chapter === 'default' ? 'active' : ''}>
            <Link to="/about">About</Link>
          </li>
          <li className={chapter === 'intro' ? 'active' : ''}>
            <Link to="/about/intro">Tutorial</Link>
          </li>
          <li className={chapter === 'advanced' ? 'active' : ''}>
            <Link to="/about/advanced">Advanced</Link>
          </li>
        </ul>
        <div className="row preamble">
          {chapter_preamble}
        </div>
        {sections}
      </div>);
  }
}

const SECTIONS = 
{
'default': [
  {img: 'barbie.png', paras: [
    (k) => (<p key={k}>SongSim uses <a href="https://en.wikipedia.org/wiki/Self-similarity_matrix">self-similarity matrices</a> to visualize patterns of repetition in text. The cell at position (x, y) is filled in if the xth and yth words of the song are the same.</p>),
    (k) => (<p key={k}>For more details, check out the <Link to="/about/intro">tutorial</Link>.</p>)
    ]},
],
'intro':
  [
    {img: 'baa1.png', paras: [
        'A self-similarity matrix is used to answer the question "which parts of this thing are alike?".',
        'Each row and column of the matrix corresponds to a word in a text. This 35 x 35 matrix represents the 35 words of "Baa Baa Black Sheep". The cell at (x, y) is filled in if the xth word and the yth word are the same.',
        'The diagonal running from top-left to bottom-right corresponds to cases where x=y, and is always filled in. The portions on either side of it are symmetric.',
      ]},
    {img: 'baa_the.png', paras: [
        'Single squares off the main diagonal like this represent words that are used repeatedly in the song (in this case, "the", which is used 4 times).',
        'You can hide these by checking the "Ignore single-word matches" box.'
      ]},
    {img: 'baa_oneforthe.png', paras: [
        'Diagonal lines represent repeated sequences of words. "one for the" appears 3 times.'
      ]},
    {img: 'baa_colorful.png', paras: [
        '"Colorful" mode assigns a unique color to each repeated word. When there are several repeated themes, this can make it easier to distinguish them.'
      ]},
    {img: 'baa_siryes.png', paras: [
        'Diagonals close to the main diagonal represent nearby repetitions ("yes sir, yes sir").'
      ]},
],
'advanced': [
  {img: 'darkhorse.png', body: (
    <div>
      <p><b>Long diagonals</b> correspond to a major repeating theme (if not <i>the</i> chorus, something chorus-like). The example on the left, <Link to="/darkhorse">Dark Horse</Link> by Katy Perry has a chorus that's sung 3 times, and no other major repeated themes.</p>
      <aside>(Melodically, the repeated section up to the last line is more like a pre-chorus or a bridge - <a href="https://www.theguardian.com/music/musicblog/2014/dec/22/2014-when-songwriters-burned-the-chorus-and-built-the-bridge">that hot trend of 2014</a>. But that's an analysis for a different tool.)</aside>
    </div>)},
  {img: 'barbiegirl.png', body: (
    <div>
      <p>But it's not uncommon for a song to have several significant repeated sections: Aqua's <Link to="/barbiegirl">Barbie Girl</Link> has an A-chorus ("I'm a Barbie Girl / in a Barbie world..."), a B-chorus ("Come on Barbie, let's go party..."), and a smaller theme that repeats 3 times ("You can touch / you can play..."), each of which has a distinct appearance in the matrix.</p>
    </div>)},
  {img: 'wimm_stripes.png', body: (
      <div>
      <p>One of the repeated sections above appears as a sort of <b>"Stripey Square"</b>.
      This happens when the repeated section is <i>itself</i> repetitive - i.e. it 
      consists of a phrase repeatedly chanted. Above, that chanted phrase is 
      "Come on Barbie, let's go party".</p>
      <p>The example on the left is from the Pixies' <Link to="/whereismymind">"Where is my Mind"</Link> the chorus of which goes...</p>
      <blockquote>
        Where is my mind<br /> 
        Where is my mind<br />
        Where is my mind
      </blockquote>
    <p>The distance between the stripes increases with the length of the repeated phrase.</p>
    </div>
    )},
  {img: 'royals_cb.png', body: (
    <div>
      <p><b>Checkerboards</b> are a special case of the above pattern where the length of the repeated phrase is two words. The example on the left is the chorus 
      of <Link to="/royals">Royals</Link> by Lorde:</p>
      <blockquote>
        And we'll never be royals<br />
        It don't run in our blood<br />
        That kind of lux just ain't for us<br />
        We crave a different kind of buzz<br />
        Let me be your ruler, you can call me Queen B<br />
        And baby I'll rule (I'll rule I'll rule I'll rule)<br />
        Let me live that fantasy
      </blockquote>
      <p>The second-last line produces the checkerboard pattern.</p>
    </div>)},
  // Epizeuxis
  {img: 'cgyoomh_blocks.png', body: (
    <div>
      <p><b>Filled-in blocks</b> are another special case of the 'stripey squares' pattern, where what's chanted is just a single word.</p>
      <p>The song on the left, <Link to="/cgyoomh">Can't Get You Out Of My Head</Link> by Kylie Minogue is an especially dramatic example. It's about 47% "la la la" by volume.</p>
      <p>The Greeks called this <a href="https://en.wiktionary.org/wiki/epizeuxis">epizeuxis</a>. I just call it great pop music.</p>
    </div>)},
  {img: 'badromance_trunc.png', body: (
    <div>
      <p><b>Short diagonals</b> represent some phrase that 
      the artist is riffing on. The matrix to the left is the beginning of Lady 
      Gaga's "Bad Romance", up to the end of the first chorus. The first verse goes...</p>
      <blockquote>
        I want your ugly<br/>
        I want your disease<br/>
        I want your everything as long as it's free<br/>
        I want your love<br/>
        Love-love-love<br/>
        I want your love<br/><br/>
        I want your drama<br/>
        The touch of your hand<br/>
        I want your leather studded kiss in the sand<br/>
        I want your love<br/>
        Love-love-love, I want your love (Love-love-love, I want your love)
      </blockquote>
      <p>The many short diagonals around the middle of the matrix correspond to the
      phrase "I want your", which begins nearly every line of the verses.
      (In rhetoric, this is called <a href="https://en.wikipedia.org/wiki/Anaphora_(rhetoric)">anaphora</a>.)</p>
    </div>)},
  {img: 'lovefool_color.png', body: (
    <div>
      <p><b>Verses</b> and <b>bridges</b> are typically distinguished by their lack
      of significant long-range repetition. They're visible as "gutters" in
      the matrix.</p>
      <p><Link to="/lovefool">Lovefool</Link> by The Cardigans, on the left, has a 
      pretty simple structure of 
      <code>verse - chorus - verse - chorus - chorus - outro</code>.</p>
      <p>With "color mode" turned on, verses can also be identified by a preponderance
      of black, the color used for any words that appear only once in the song.</p>
    </div>)}
]
}

export default About;