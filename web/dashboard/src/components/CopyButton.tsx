import { useState } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import IconButton from "@mui/material/IconButton";

export function CopyButton({
  value,
  ariaLabel = "Copy",
  title,
}: {
  value: string;
  ariaLabel?: string;
  title?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  const label = copied ? "Copied" : ariaLabel;
  const tooltip = copied ? "Copied" : title ?? ariaLabel;

  return (
    <IconButton
      aria-label={label}
      color={copied ? "success" : "default"}
      edge="end"
      onClick={handleCopy}
      title={tooltip}
      type="button"
      size="small"
    >
      {copied ? <CheckRoundedIcon fontSize="small" /> : <ContentCopyRoundedIcon fontSize="small" />}
    </IconButton>
  );
}
