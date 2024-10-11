import { Constants } from "./constants";

export class Khn {
  private url: string;

  constructor() {
    this.url = Constants.YAHOO_URL;
  }

  redirect(url: string = Constants.YAHOO_URL) {
    window.location.href = url;
  }

  load() {
    chrome.storage.sync.get(['url'], (result: { key: string, url: string }) => {
      this.url = result.url ?? this.url;
      this.redirect(this.url);
    });
  }
}

window.onload = () => {
  const khn = new Khn();
  khn.load();
}
