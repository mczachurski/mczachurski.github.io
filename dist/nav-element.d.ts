import { LitElement } from 'lit';
import { Pages } from './pages';
/**
 * Navigation bar.
 */
export declare class NavElement extends LitElement {
    colorSchemeQueryList: MediaQueryList;
    setColorScheme: (e: MediaQueryList | MediaQueryListEvent) => void;
    constructor();
    createRenderRoot(): this;
    private isIndex;
    private isMainPage;
    navbarCss: string;
    page: Pages;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'nav-element': NavElement;
    }
}
//# sourceMappingURL=nav-element.d.ts.map