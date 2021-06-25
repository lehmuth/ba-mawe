import { html, css, attach, defineComponent } from '../utils/components.js';
import './bold-button.js';

const template = html`
  <div id="container">
    <div id="head">
      <img src="../assets/logo_menu.png" id="logo" alt="Patch Wear Family" />
      <a
        href="https://www.instagram.com/patch_wear_family/"
        id="insta-mobile"
      ></a>
    </div>
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
        <a href="https://www.instagram.com/patch_wear_family/" id="insta"></a>
      </div>
      <div id="icons-mobile">
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

  #head {
    flex: 0 0 9.96em;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
  }

  #logo {
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

  #icons,
  #icons-mobile {
    flex: 0 3.75em;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    align-self: strech;
    padding: 3.7em var(--container-padding) 1.7em 0;
  }

  #icons-mobile {
    display: none;
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

  #icons > a,
  #icons-mobile > a {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #icons a:nth-child(1),
  #icons-mobile a:nth-child(1) {
    justify-content: flex-start;
  }

  #icons a:nth-child(2),
  #icons-mobile a:nth-child(2) {
    justify-content: flex-start;
  }

  #icons a:nth-child(3),
  #icons-mobile a:nth-child(3) {
    justify-content: flex-end;
  }

  #insta,
  #insta-mobile {
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

  #insta-mobile {
    display: none;
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

  @media only screen and (max-width: 590px) {
    :host {
      font-size: 1.5em;
    }

    #content {
      padding: 1rem 2.2rem;
      flex-flow: row wrap;
      box-sizing: border-box;
    }

    #head {
      display: flex;
      flex-basis: 100%;
    }

    #middle {
      flex-flow: column wrap;
      flex-basis: 50%;
      align-items: flex-start;
    }

    #support {
      flex-basis: 100%;
      max-width: 100%;
      margin-bottom: 1rem;
    }

    #icons {
      display: none;
    }

    #icons-mobile {
      display: flex;
      flex-basis: 5em;
      padding: 0;
    }

    #insta-mobile {
      display: block;
      align-self: flex-end;
      flex: 0 0 5em;
      height: 5em;
      background-position: bottom center;
      background-size: contain;
      margin-right: 2rem;
      margin-bottom: 0.55rem;
    }

    #insta {
      display: none;
    }
  }

  @media only screen and (max-width: 563px) {
    :host {
      font-size: 1.2em;
    }

    #content {
      padding: 1rem 1.8rem;
    }
  }

  @media only screen and (max-width: 468px) {
    :host {
      font-size: 1em;
    }
  }

  @media only screen and (max-width: 403px) {
    #support {
      font-size: 2em;
    }
  }
`;

defineComponent(
  'page-footer',
  class extends HTMLElement {
    constructor() {
      super();
      attach(this, template, styles);
    }
  }
);
