const swRegister = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
    // build하게되면 dist직하에 들어가기 때문에 root기준으로 들어간다.
      .register("/sw.js", { scope: '/' })
      .then((registration) => {
        console.log("서비스워커 등록 성공", registration);
      })
      .catch((error) => {
        console.error("서비스워커 등록 실패: ", error);
      });
  }
}

export default swRegister;