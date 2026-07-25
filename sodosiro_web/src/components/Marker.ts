export default function getMarker(title: string) {
  return `
        <div style="
          text-shadow:
            -1px -1px 0 white,
            1px -1px 0 white,
            -1px 1px 0 white,
            1px 1px 0 white;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
        ">
          ${title}
        </div>
      `;
}
