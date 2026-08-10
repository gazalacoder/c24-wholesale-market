import { useEffect, useRef, useState } from "react";
import {
  Html5Qrcode,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";

import "./QRScanner.css";

export default function QRScanner({ onClose }) {

  const scannerRef = useRef(null);

  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {

    let scanner;

    async function startScanner() {

      try {

        scanner = new Html5Qrcode(
          "c24-qr-reader",
          {
            formatsToSupport: [
              Html5QrcodeSupportedFormats.QR_CODE,
            ],
          }
        );

        scannerRef.current = scanner;

        await scanner.start(
          {
            facingMode: "environment",
          },
          {
            fps: 10,
            qrbox: {
              width: 240,
              height: 240,
            },
          },
          async (decodedText) => {

            setResult(decodedText);

            try {
              await scanner.stop();
            } catch {
              // scanner already stopped
            }

          },
          () => {
            // Scanning continues normally
          }
        );

      } catch (err) {

        console.error("QR Scanner:", err);

        setError(
          "Camera start nahi ho paaya. Browser camera permission allow karein."
        );

      }
    }

    startScanner();

    return () => {

      if (scannerRef.current) {

        scannerRef.current
          .stop()
          .catch(() => {});

      }

    };

  }, []);


  return (
    <div className="qr-overlay">

      <div className="qr-modal">

        <button
          className="qr-close"
          onClick={onClose}
        >
          ×
        </button>


        <div className="qr-heading">

          <span>
            C24 SMART SCANNER
          </span>

          <h2>
            Scan QR Code
          </h2>

          <p>
            Product QR code ko camera ke
            saamne rakhein.
          </p>

        </div>


        {!result && !error && (
          <div
            id="c24-qr-reader"
            className="qr-reader"
          />
        )}


        {error && (

          <div className="qr-error">

            <strong>
              Camera unavailable
            </strong>

            <p>
              {error}
            </p>

          </div>

        )}


        {result && (

          <div className="qr-result">

            <span>
              ✓ QR CODE DETECTED
            </span>

            <h3>
              Scan Result
            </h3>

            <div className="qr-result-text">
              {result}
            </div>


            {result.startsWith("http") && (

              <a
                href={result}
                target="_blank"
                rel="noopener noreferrer"
                className="qr-open-btn"
              >
                Open Result →
              </a>

            )}

            <button
              className="qr-close-result"
              onClick={onClose}
            >
              Done
            </button>

          </div>

        )}


        <div className="qr-footer">
          C24 HOME APPLICATION WHOLESALE
        </div>

      </div>

    </div>
  );
}