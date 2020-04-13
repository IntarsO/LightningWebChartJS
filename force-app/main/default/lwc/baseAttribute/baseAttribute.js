import { LightningElement } from 'lwc';
import { OPTION_EVENT_NAME, DISCONNECT_EVENT_NAME } from 'c/constants';
import MicroTaskHandler from 'c/microTaskHandler';

export default class BaseAttribute extends LightningElement {
  constructor() {
    super();
    this._eventName = OPTION_EVENT_NAME;
    this._mt = new MicroTaskHandler();
    this._mt.registerCallback(() => this.dispatchOption());
    this._payload = {};
  }

  renderedCallback() {
    this._parent = this.template.host.parentNode;
  }

  disconnectedCallback() {
    if (this._parent) {
      this._parent.dispatchEvent(
        new CustomEvent(DISCONNECT_EVENT_NAME, {
          bubbles: true,
          detail: {
            option: this._option,
            payload: this._payload
          }
        })
      );
    }
  }

  dispatchOption() {
    this.dispatchEvent(
      new CustomEvent(this._eventName, {
        bubbles: true,
        detail: {
          option: this._option,
          payload: this._payload
        }
      })
    );
  }
}
