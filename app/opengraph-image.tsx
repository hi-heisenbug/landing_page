import { ImageResponse } from "next/og";

export const alt = "Heisenbug | Detect npm supply-chain attacks at runtime with eBPF";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #ffffff 0%, #f2eeee 100%)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 80px",
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "radial-gradient(circle, #1c9770 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ambient Glows */}
        <div
          style={{
            position: "absolute",
            left: "10%",
            top: "20%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(147, 203, 82, 0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "5%",
            bottom: "10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(28, 151, 112, 0.1)",
            filter: "blur(100px)",
          }}
        />

        {/* Left Side: Brand & Value Prop */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "600px",
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "48px",
            }}
          >
            {/* Delta Mark */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3.2L21.4 20.8H2.6L12 3.2Z"
                stroke="#93cb52"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#464646",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              Heisenbug
            </span>
          </div>

          {/* Eyebrow */}
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#1c9770",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Runtime Supply-Chain Security
          </span>

          {/* Title */}
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "bold",
              color: "#464646",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: "0 0 20px 0",
            }}
          >
            Know which dependency did it.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "18px",
              color: "#464646",
              opacity: 0.7,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Attributes eBPF kernel syscalls to exact npm packages and version
            baselines. Open source, Apache-2.0, self-hosted.
          </p>
        </div>

        {/* Right Side: Simulated Code/Alert Terminal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "420px",
            borderRadius: "16px",
            background: "#1a1a2e",
            border: "1px solid rgba(147, 203, 82, 0.25)",
            boxShadow: "0 24px 80px -24px rgba(70, 70, 70, 0.3)",
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#141420",
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#ff5f57",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#febc2e",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#28c840",
              }}
            />
            <span
              style={{
                marginLeft: "8px",
                fontSize: "11px",
                color: "rgba(255, 255, 255, 0.4)",
                fontFamily: "monospace",
              }}
            >
              goodmanctl - alert
            </span>
          </div>

          {/* Body */}
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              fontFamily: "monospace",
              fontSize: "12px",
              lineHeight: 1.6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  background: "rgba(239, 68, 68, 0.2)",
                  color: "#f87171",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                CRITICAL
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                behavior drift detected
              </span>
            </div>

            <div style={{ display: "flex", color: "rgba(255, 255, 255, 0.6)", marginBottom: "4px" }}>
              service: <span style={{ color: "#ffffff", marginLeft: "4px" }}>checkout-api</span>
            </div>
            <div style={{ display: "flex", color: "rgba(255, 255, 255, 0.6)", marginBottom: "12px" }}>
              package: <span style={{ color: "#ffffff", fontWeight: "bold", marginLeft: "4px" }}>tanstack-query@1.169.5</span>
            </div>

            <div style={{ color: "#febc2e", marginBottom: "4px" }}>
              + NEW CONNECT 169.254.169.254:80
            </div>
            <div style={{ color: "#febc2e", marginBottom: "12px" }}>
              + NEW POST git-tanstack.com/collect
            </div>

            <div style={{ color: "#93cb52", fontWeight: "bold" }}>
              → attributed to package in 2m 41s
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
