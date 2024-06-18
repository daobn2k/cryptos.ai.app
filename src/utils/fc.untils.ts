import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(calendar);

function formatRelativeTime(date: any, t?: any) {
  const now = dayjs();
  const diffInSeconds = now.diff(date, "second");
  const diffInMinutes = now.diff(date, "minute");
  const diffInHours = now.diff(date, "hour");
  const diffInDays = now.diff(date, "day");

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return `${diffInDays}d ago`;
  }
}

export const conditionShowTime = (createdAt: string, t?: any) => {
  const ago = dayjs(createdAt);

  return formatRelativeTime(ago, t);
  // const isDayAgo: boolean = dayjs.utc().diff(createdAt, "hour") < 24;

  // return isDayAgo ? dayjs(createdAt).fromNow() : formatTime(createdAt);
};
export const formatNumber = (number: number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  }
  return number?.toString();
};

export const adjustHexColor = (hex: string) => {
  // Function to convert HEX to RGB
  const hexToRgb = (hex: string) => {
    // Remove # if present
    hex = hex.replace(/^#/, "");

    // Convert short hex to full hex
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    // Parse hex values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
  };

  // Function to convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h: any,
      s: number,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  // Extract RGB values from the input string
  const [r, g, b] = hexToRgb(hex);

  // Convert RGB to HSL
  let [h, s, l] = rgbToHsl(r, g, b);

  // Adjust the lightness if it's less than 27
  l = l < 27 ? 27 : l;

  // Convert adjusted HSL to HEX
  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  return hslToHex(h, s, l);
};

export function highlightNearbyText(
  inputString: string,
  callback: (text: string) => void
) {
  var regex = /([!@#$%^&*])(\w+)/g;

  var hrefRegex = /<a\b[^>]*>(.*?)<\/a>/gi;

  const updatedHtmlContent = inputString.replace(
    hrefRegex,
    function (match, content) {
      console.log(match, "match");
      const href = match.split('"');
      console.log(href, "href");
      console.log(content, "content");

      return `<a href=${href[1]} style="text-decoration:none;"}>${content}</a>`;
    }
  );

  var highlightedString = updatedHtmlContent.replace(
    regex,
    function (match, specialChar, nearbyText) {
      if (checkNumber(nearbyText)) return specialChar + nearbyText;
      if (specialChar === "@") {
        const link = callback(nearbyText);
        return (
          `
      <span class="highlight">
      <a href=${link} style="font-size:16px;font-weight:400;line-height:'160%';color:#bffd17;text-decoration:none;">
    
      ` +
          specialChar +
          nearbyText +
          "</a> </span>"
        );
      } else {
        return (
          '<span class="highlight">' + specialChar + nearbyText + "</span>"
        );
      }
    }
  );
  console.log(highlightedString, "highlightedString");

  return highlightedString;
}

export function checkNumber(value: any) {
  return !isNaN(value);
}
