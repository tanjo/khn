import { Constants } from "./constants";

class Options {
    private _selected_url: string | null;

    private _yahooRadio: HTMLInputElement | null;
    private _googleRadio: HTMLInputElement | null;
    private _bingRadio: HTMLInputElement | null;
    private _otherRadio: HTMLInputElement | null;
    private _urlInput: HTMLInputElement | null;
    private _saveButton: HTMLButtonElement | null;

    constructor() {
        this._selected_url = Constants.YAHOO_URL;
        this._yahooRadio = document.getElementById('yahoo') as HTMLInputElement;
        this._googleRadio = document.getElementById('google') as HTMLInputElement;
        this._bingRadio = document.getElementById('bing') as HTMLInputElement;
        this._otherRadio = document.getElementById('other') as HTMLInputElement;
        this._urlInput = document.getElementById('url') as HTMLInputElement;
        this._saveButton = document.getElementById('save') as HTMLButtonElement;
    }

    load() {
        chrome.storage.sync.get(['url'], (result: { key: string, url: string }) => {
            this._selected_url = result.url ?? this._selected_url;
            this.render();
        });
    }

    render() {
        if (this._selected_url === Constants.YAHOO_URL && this._yahooRadio) {
            this._yahooRadio.setAttribute('checked', 'checked');
        } else if (this._selected_url === Constants.GOOGLE_URL && this._googleRadio) {
            this._googleRadio.setAttribute('checked', 'checked');
        } else if (this._selected_url === Constants.BING_URL && this._bingRadio) {
            this._bingRadio.setAttribute('checked', 'checked');
        } else if (this._selected_url && this._otherRadio && this._urlInput) {
            this._otherRadio.setAttribute('checked', 'checked');
            this._urlInput.value = this._selected_url;
        }

        if (this._saveButton) {
            this._saveButton.removeAttribute('disabled');
            this._saveButton.addEventListener('click', () => {
                this.save();
            });
        }
    }

    save() {
        let url = Constants.YAHOO_URL;
        if (this._googleRadio && this._googleRadio.checked) {
            url = Constants.GOOGLE_URL;
        } else if (this._bingRadio && this._bingRadio.checked) {
            url = Constants.BING_URL;
        } else if (this._otherRadio && this._otherRadio.checked && this._urlInput) {
            url = this._urlInput.value;
        }

        if (Constants.URL_REGEX.test(url)) {
            chrome.storage.sync.set({ url: url }, () => {
                this._selected_url = url;
                this.render();
            });
        }
    }
};

window.onload = () => {
    const options = new Options();
    options.load();
}