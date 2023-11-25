document.addEventListener('DOMContentLoaded', function() {
  var loadingBar = document.querySelector('.loading-bar');
  var countElement = document.querySelector('.count');
  var loadingWrap = document.querySelector('.loading-wrap'); // 追加

  // 初期状態では非表示にする
  loadingBar.style.display = 'none';
  countElement.style.display = 'none';

  // ローディングバーとカウントアップのアニメーションを表示する関数
  function showLoadingBarWithCountUp() {
    loadingBar.style.display = 'flex';
    countElement.style.display = 'inline-block';

    // ローディングバーの幅をリセット
    loadingBar.style.width = '0%';

    // アニメーション開始
    setTimeout(function() {
      loadingBar.style.width = '100%';
      countUpAnimation(0, 100, 16000, customEasing); 
      // 0から100までのカウントアップを5秒間で実行（イージング関数：customEasing）

      // フェードアウト
      setTimeout(function() {
        var opacity = 1;
        var duration = 16000; // フェードアウトにかける時間（ミリ秒）
        var interval = 50; // フェードアウトの更新間隔（ミリ秒）

        var fadeOutTimer = setInterval(function() {
          opacity -= interval / duration;
          loadingWrap.style.opacity = opacity;

          if (opacity <= 0) {
            clearInterval(fadeOutTimer);
            loadingWrap.style.display = 'none';
            loadingWrap.style.visibility = 'hidden';
          }
        }, interval);
      }, 16500);
    }, 100); // 調整した待機時間
  }

  // カウントアップのアニメーションを実行する関数
  function countUpAnimation(start, end, duration, easing) {
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = easing(elapsed / duration);

      current = start + progress * range;
      countElement.textContent = Math.round(current);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        countElement.textContent = end;
      }
    }

    requestAnimationFrame(animate);
  }

  // カスタムイージング
  function customEasing(t) {
    const p0 = 0;
    const p1 = 0.42;
    const p2 = 0.52;
    const p3 = 1;
    console.log(t);

    if (t < 0.3) {
      return p0 + ((p1 - p0) * (t / 0.3));
    } else if (t < 0.6) {
      return p1 + ((p2 - p1) * ((t - 0.3) / (0.6 - 0.3)));
    } else {
      return p2 + ((p3 - p2) * ((t - 0.6) / (1 - 0.6)));
    }
  }

  // ローディングバーとカウントアップのアニメーションを表示する
  showLoadingBarWithCountUp();
});