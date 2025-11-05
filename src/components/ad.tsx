"use client";
import Script from "next/script";

export default function Ad() {
  return (
    <>
      <script type="text/javascript">
        {`
          var adstir_vars = {
            ver: "4.0",
            app_id: "MEDIA-c5b7408e",
            ad_spot: 1,
            center: false
          };
        `}
      </script>

      <Script
        src="https://js.ad-stir.com/js/adstir.js"
        strategy="afterInteractive"
      />
    </>
  );
}
