import { useEffect, useState } from "react";

export const useDaumScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (document.getElementById("daum-postcode-script")) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.id = "daum-postcode-script";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  return isScriptLoaded;
};
