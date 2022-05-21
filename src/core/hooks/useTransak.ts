import transakSDK from "@transak/transak-sdk";

const useTransak = (windowProp: Window) => {
  const transak = new transakSDK({
    apiKey: "52b93ced-3d40-4244-9bb4-61692ba0cb1c", // Your API Key (Required)
    environment: "STAGING", // STAGING/PRODUCTION (Required)
    defaultCryptoCurrency: "ETH",
    walletAddress: "", // Your customer wallet address
    themeColor: "ffffff", // App theme color in hex
    email: "", // Your customer email address (Optional)
    redirectURL: "",
    hostURL: windowProp.location.origin, // Required field
    widgetHeight: "625px",
    widgetWidth: "500px",
  });

  transak.init();

  // This will trigger when the user closed the widget
  transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData: any) => {
    console.log({ orderData });
    transak.close();
  });

  // This will trigger when the user marks payment is made.
  transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
    console.log({ orderData });
    transak.close();
  });
  return transak;
};

export default useTransak;
