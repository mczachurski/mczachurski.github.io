var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Pages } from './pages';
/**
 * Navigation bar.
 */
let NavElement = class NavElement extends LitElement {
    constructor() {
        super();
        this.colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        this.setColorScheme = (e) => {
            if (e.matches) {
                this.navbarCss = 'navbar-dark';
            }
            else {
                this.navbarCss = 'navbar-light';
            }
        };
        this.navbarCss = 'navbar-light';
        this.page = Pages.index;
        this.setColorScheme(this.colorSchemeQueryList);
        this.colorSchemeQueryList.addEventListener("change", this.setColorScheme);
    }
    createRenderRoot() {
        return this;
    }
    isIndex() {
        return this.page === Pages.index;
    }
    isMainPage() {
        return this.page === Pages.index || this.page === Pages.gallery;
    }
    render() {
        return html `
        <!-- Navigation bar -->
        <nav class="navbar navbar-expand-lg bg-transparent ${this.navbarCss}">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand me-4" href="index.html">Marcin Czachurski</a>

                <!-- Navigation toggler -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Navigation -->
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link ${this.isIndex() ? 'active' : ''}" aria-current="page" href="${this.isMainPage() ? '' : '../'}index.html">About me</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${!this.isIndex() ? 'active' : ''}" href="${this.isMainPage() ? '' : '../'}gallery.html">Photography</a>
                        </li>
                    </ul>
                </div>

                <!-- Social icons -->
                <div class="collapse navbar-collapse icons">
                    <ul class="navbar-nav flex-row flex-wrap ms-auto d-md-none d-lg-flex">
                        <li class="nav-item col-6 col-md-auto">
                            <a class="nav-link pt-1" href="https://github.com/mczachurski" target="_blank" aria-label="GitHub" rel="noopener">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" class="navbar-nav-svg d-inline-block align-text-top" viewBox="0 0 512 499.36" role="img">
                                    <title>GitHub</title>
                                    <path fill="currentColor" fill-rule="evenodd"
                                        d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z">
                                    </path>
                                </svg>
                                <small class="d-md-none ms-2">GitHub</small>
                            </a>
                        </li>
                        <li class="nav-item col-6 col-md-auto">
                            <a class="nav-link pt-1" href="https://twitter.com/mczachurski" target="_blank" aria-label="Twitter" rel="noopener">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" class="navbar-nav-svg d-inline-block align-text-top" viewBox="0 0 512 416.32" role="img">
                                    <title>Twitter</title>
                                    <path fill="currentColor"
                                        d="M160.83 416.32c193.2 0 298.92-160.22 298.92-298.92 0-4.51 0-9-.2-13.52A214 214 0 0 0 512 49.38a212.93 212.93 0 0 1-60.44 16.6 105.7 105.7 0 0 0 46.3-58.19 209 209 0 0 1-66.79 25.37 105.09 105.09 0 0 0-181.73 71.91 116.12 116.12 0 0 0 2.66 24c-87.28-4.3-164.73-46.3-216.56-109.82A105.48 105.48 0 0 0 68 159.6a106.27 106.27 0 0 1-47.53-13.11v1.43a105.28 105.28 0 0 0 84.21 103.06 105.67 105.67 0 0 1-47.33 1.84 105.06 105.06 0 0 0 98.14 72.94A210.72 210.72 0 0 1 25 370.84a202.17 202.17 0 0 1-25-1.43 298.85 298.85 0 0 0 160.83 46.92">
                                    </path>
                                </svg>
                                <small class="d-md-none ms-2">Twitter</small>
                            </a>
                        </li>
                        <li class="nav-item col-6 col-md-auto">
                            <a class="nav-link pt-1" href="https://www.instagram.com/mczachurski/" target="_blank" aria-label="Instagram" rel="noopener">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" class="navbar-nav-svg d-inline-block align-text-top" viewBox="0 0 16 16" role="img">
                                    <title>Instagram</title>
                                    <path fill="currentColor"
                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg>
                                <small class="d-md-none ms-2">Instagram</small>
                            </a>
                        </li>
                        <li class="nav-item col-6 col-md-auto">
                            <a class="nav-link pt-1" href="https://medium.com/@mczachurski" target="_blank" aria-label="Medium" rel="noopener">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" class="navbar-nav-svg d-inline-block align-text-top" viewBox="0 0 16 16" role="img">
                                    <title>Medium</title>
                                    <path fill="currentColor"
                                        d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z" />
                                </svg>
                                <small class="d-md-none ms-2">Medium</small>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
     `;
    }
};
__decorate([
    property({ type: String })
], NavElement.prototype, "navbarCss", void 0);
__decorate([
    property({
        type: Object, reflect: true, converter: {
            fromAttribute: (value, _type) => {
                if (!value) {
                    return Pages.unknown;
                }
                const enumValue = Pages[value];
                return enumValue;
            },
            toAttribute: (value, _type) => {
                const stringValue = value.toString();
                return stringValue;
            }
        }
    })
], NavElement.prototype, "page", void 0);
NavElement = __decorate([
    customElement('nav-element')
], NavElement);
export { NavElement };
//# sourceMappingURL=nav-element.js.map