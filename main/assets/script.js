document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input-box');
  
    input.addEventListener('input', function () {
      this.style.width = 'auto';
      this.style.width = (this.scrollWidth + 2) + 'px';
    });
  });