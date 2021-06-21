import { html, css, attach, defineComponent } from '../scripts/utils.js';
import './bold-button.js';

const template = html`
  <div id="container">
    <img src="../assets/logo_menu.png" id="logo" />
    <div id="content">
      <a href="#" id="support">Jetzt Unterstützen! &gt;</a>
      <div id="middle">
        <div id="address">
          Patch Wear Family<br />Neue Straße 36<br />89073 Ulm<br />
          <br />+49 1601204502
        </div>
        <div id="links">
          <a href="#">Impressum</a><a href="#">AGBs</a
          ><a href="#">Datenschutz</a><a href="#">FAQ</a
          ><a href="#">Newsletter</a>
        </div>
        <a href="#" id="insta"></a>
      </div>
    </div>
    <div id="icons">
      <a href="https://www.fairwear.org/" target="_blank"
        ><img src="../assets/fair-wear-logo.jpg" alt="Fair Wear" /></a
      ><a
        href="https://www.peta.de/veganleben/petaapprovedvegan/"
        target="_blank"
        ><img
          src="../assets/PETAapprovedveganLOGO.jpg"
          alt="PETA approved vegan" /></a
      ><a href="https://global-standard.org/" target="_blank"
        ><img
          src="../assets/gots-logo.jpg"
          alt="Global Organic Textile
        Standard"
      /></a>
    </div>
  </div>
`;

const styles = css`
  #container {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    box-sizing: border-box;
    background-color: #000;
  }

  #logo {
    grid-area: logo;
    height: 15.65em;
    flex: 0 0 9.96em;
    display: block;
    background-color: #fff;
  }

  #content {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding: 3.7em 3em 1.7em 3em;
  }

  #support {
    flex: 0;
    font-size: 2.5em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  #middle {
    flex: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
  }

  #icons {
    flex: 0 3.75em;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    align-self: strech;
    padding: 3.7em var(--container-padding) 1.7em 0;
  }

  #address {
    flex: 1.2;
    color: #fff;
    line-height: 1.2em;
  }

  #links {
    flex: 0.8;
    display: flex;
    flex-flow: column nowrap;
    line-height: 1.2em;
  }

  #icons > a {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #icons a:nth-child(1) {
    justify-content: flex-start;
  }

  #icons a:nth-child(2) {
    justify-content: flex-start;
  }

  #links a:nth-child(3) {
    justify-content: flex-end;
  }

  #insta {
    flex: 1;
    align-self: stretch;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background-image: url('../assets/instagram-logo.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100%;
    filter: invert(1);
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  img {
    object-fit: cover;
    width: 100%;
  }

  @media only screen and (max-width: 685px) {

    #content {
      padding-right: var(--container-padding);
    }

    #icons {
      box-sizing: border-box;
      flex: 1 0 100%;
      display: flex;
      flex-direction: row;
      padding-top: 0;
      padding-left: 12.96em;
      justify-content: space-between;
    }

    #icons img {
      width: 80%;
    }
  }
`;

defineComponent(
  'page-footer',
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
    }
  }
);
