//*
//* Всплывающие уведомления
//*
class Toast {
  $app: HTMLElement;
  wrapper: HTMLElement;
  text: HTMLParagraphElement | null;

  constructor() {
    this.$app = document.getElementById('app') as HTMLElement;
    this.wrapper = document.createElement('div');
    this.text = null;

    this.wrapper.classList.add('toast-wrapper');
    this.$app?.append(this.wrapper);
  }

  onToast(color: string, value: string, remove: boolean): void {
    const text = document.createElement('p');
    text.classList.add('toast_text');

    this.wrapper.prepend(text);

    text.textContent = `${value}`;
    text.style.color = `${color}`;

    if (remove)
      setTimeout(() => {
        text.remove();
      }, 3500);
  }

  //   remove() {
  //     setTimeout(() => {
  //       this.wrapper.remove();
  //     }, 1500);
  //   }
}

const toast = new Toast();
export { toast };
