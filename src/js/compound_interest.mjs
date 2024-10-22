(function () {
  b_calc.addEventListener("click", () => {
    //a = p * (1 + (r/n))^tn
    const p = start_amt.value;
    const r = int_rate.value * 0.01; //(convert it into a percentage)
    const n = 1;
    const t = years.value;

    const a = p * Math.pow(1 + r / n, t * n);
    result.innerText = Math.round(a * 100) / 100;
  });
  b_clear.addEventListener("click", () => {
    start_amt.value = 0;
    int_rate.value = 0;
    years.value = 0;
  });
})();