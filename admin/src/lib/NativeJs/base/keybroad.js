export class KeybroadCollenter {
    constructor() {
        this.handleKeyPress = this.handleKeyPress.bind(this);

        // 在建構函式中設定要監聽的按鍵事件
        window.addEventListener('keydown', this.handleKeyPress);
        window.addEventListener('compositionend', this.handleKeyPress);
    }

    handleKeyPress(event) {
        // 取得輸入的字元
        let charCode = event.which || event.keyCode;
        let char = String.fromCharCode(charCode);

        // 在按鍵輸入時執行的程式碼
        console.log('Input:', char);
    }

    // 若不再需要監聽按鍵，可以在類別中加入以下的方法來清除事件監聽
    removeKeyListener() {
        window.removeEventListener('keydown', this.handleKeyPress);
        window.removeEventListener('compositionend', this.handleKeyPress);
    }
}
