export type IconType = {
  className?: string;
};

export const GithubIcon = (props: IconType) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 496 512"
    className={props.className}
    height="100%"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  </svg>
);

export const LinkedinIcon = (props: IconType) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    width="100%"
    height="100%"
    viewBox="0 0 50 50"
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
  </svg>
);

export const TwitterIcon = (props: IconType) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className={props.className}
    height="100%"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
  </svg>
);

export const ArrowTopRight = (props: IconType) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    className={props.className}
    height="100%"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
    ></path>
  </svg>
);

export function NextJsIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="100%"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="text-zinc-900 dark:text-zinc-100"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993"></path>
      <path d="M15 12v-3"></path>
    </svg>
  );
}

export function ReactRouterDomIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? ""}
    >
      <path
        d="M27.7179 8.23453C26.6978 7.90351 26.171 8.01511 25.101 7.89443C23.447 7.70823 22.788 7.04103 22.5084 5.32388C22.352 4.36531 22.5367 2.96182 22.1373 2.0929C21.3735 0.436097 19.5863 -0.306966 17.7908 0.117149C16.2749 0.47575 15.0135 2.03946 14.9436 3.64454C14.8638 5.4772 15.8755 7.04091 17.6128 7.58054C18.4381 7.83742 19.3151 7.96673 20.1771 8.03224C21.7579 8.1512 21.8794 9.05816 22.3071 9.80467C22.5767 10.2753 22.8379 10.7391 22.8379 12.1425C22.8379 13.5459 22.575 14.0096 22.3071 14.4803C21.8794 15.2251 21.3519 15.713 19.7711 15.8337C18.9091 15.8992 18.0305 16.0285 17.2067 16.2854C15.4695 16.8267 14.4577 18.3887 14.5376 20.2213C14.6075 21.8264 15.8688 23.3901 17.3848 23.7487C19.1803 24.1746 20.9675 23.4298 21.7313 21.773C22.1324 20.9041 22.352 19.9196 22.5084 18.9611C22.7897 17.2439 23.4486 16.5767 25.101 16.3905C26.171 16.2698 27.2784 16.3905 28.281 15.8026C29.3406 15.0036 30.2872 13.8045 30.2872 12.1425C30.2872 10.4805 29.2671 8.73795 27.7179 8.23453Z"
        fill="#F44250"
      />
      <path
        d="M10.7468 16.0372C8.66173 16.0372 6.96094 14.2786 6.96094 12.1226C6.96094 9.96665 8.66173 8.20801 10.7468 8.20801C12.8318 8.20801 14.5326 9.96665 14.5326 12.1226C14.5326 14.2769 12.8302 16.0372 10.7468 16.0372Z"
        className="fill-zinc-900 dark:fill-zinc-100"
      />
      <path
        d="M3.77247 23.9928C1.69077 23.9876 -0.00498999 22.2221 1.10332e-05 20.0644C0.00503422 17.9101 1.71249 16.1567 3.7992 16.1636C5.88256 16.1688 7.57832 17.9343 7.57166 20.092C7.56663 22.2445 5.85917 23.998 3.77247 23.9928Z"
        className="fill-zinc-900 dark:fill-zinc-100"
      />
      <path
        d="M31.9021 23.9927C29.8138 24.0048 28.0997 22.2583 28.088 20.1076C28.0763 17.9482 29.7654 16.1758 31.8453 16.1636C33.9337 16.1516 35.6478 17.8981 35.6595 20.0488C35.6711 22.2065 33.9821 23.9806 31.9021 23.9927Z"
        className="fill-zinc-900 dark:fill-zinc-100"
      />
    </svg>
  );
}

export function FramerMotionIcon({ className }: { className: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 339 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? ""}
    >
      <path
        d="M30 45H309V185.667H169.5L30 45ZM30 185.667H169.5L309 326.333H169.5V467L30 326.333V185.667Z"
        className="fill-zinc-900 dark:fill-zinc-100"
      />
    </svg>
  );
}

export function VitePwaIcon({ className }: { className: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 155 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? ""}
    >
      <path
        d="M50.6853 104.345C48.3909 100.398 46.0047 96.3602 43.7103 92.4138C43.5268 92.1385 43.435 91.8632 43.5267 91.4043C45.8211 84.4293 48.1155 77.3626 50.4099 70.3876C50.4099 70.2959 50.5017 70.1123 50.5935 69.837C53.255 75.0682 55.8247 80.2076 58.4862 85.4389C58.6697 85.0717 58.7615 84.7964 58.8533 84.5211C62.4326 73.508 66.0118 62.5867 69.5911 51.5736C69.7746 51.1147 69.9582 50.9312 70.417 51.0229C73.6292 51.0229 76.8414 51.0229 80.1453 51.0229C80.6959 51.0229 80.8795 51.2065 81.063 51.6654C84.367 62.5867 87.6709 73.4162 90.9748 84.3375C91.0666 84.6129 91.1584 84.98 91.3419 85.4389C91.8008 84.5211 92.1679 83.6033 92.4432 82.7774C96.9402 72.3149 101.345 61.9443 105.842 51.4818C105.934 51.2065 106.026 51.0229 106.393 51.0229C110.982 51.0229 115.571 51.0229 120.068 51.0229C120.068 51.0229 120.16 51.0229 120.251 51.0229C119.701 52.3078 119.242 53.5009 118.783 54.7857C112.175 71.0301 105.659 87.3661 99.0511 103.61C98.9593 103.794 98.7757 103.978 98.8675 104.253C94.0952 104.253 89.3229 104.253 84.5505 104.253C84.6423 104.069 84.5505 103.794 84.4587 103.61C84.0916 102.417 83.7245 101.224 83.3574 100.031C80.6042 91.3125 77.9426 82.6856 75.1894 73.9669C75.1894 73.7833 75.1894 73.5998 74.9141 73.508C71.5184 83.6951 68.2144 93.974 64.8187 104.161C60.0464 104.345 55.3658 104.345 50.6853 104.345Z"
        fill="#4AA6C0"
      />
      <path
        d="M7 104.345C7 86.8155 7 69.2863 7 51.7571C7 51.2065 7.09178 51.0229 7.73421 51.0229C15.168 51.0229 22.6019 51.0229 30.0357 51.0229C34.1656 51.0229 38.0202 51.9407 41.3241 54.5104C42.7008 55.5199 43.8938 56.8048 44.9034 58.2732C45.0869 58.5485 45.0869 58.7321 44.9952 59.0074C42.2419 67.5426 39.3968 76.1695 36.6436 84.7046C36.5518 85.0717 36.3682 85.1635 36.0011 85.2553C34.0738 85.7142 32.0548 85.9895 30.0357 85.9895C27.0071 85.9895 24.0703 85.9895 21.0417 85.9895C20.6746 85.9895 20.5828 85.9895 20.5828 86.4484C20.5828 92.322 20.5828 98.2874 20.5828 104.161V104.253C16.0858 104.345 11.497 104.345 7 104.345ZM20.5828 68.4603C20.5828 70.6629 20.5828 72.8656 20.5828 75.16C20.5828 75.6188 20.6746 75.7106 21.1335 75.7106C22.2348 75.7106 23.4279 75.7106 24.5292 75.7106C26.0894 75.7106 27.6495 75.7106 29.2097 75.3435C30.5864 74.9764 31.8712 74.5175 32.6972 73.3244C34.441 70.8465 34.6245 68.0932 33.5232 65.34C32.6054 62.862 30.4946 61.8525 28.0166 61.5771C25.7223 61.3018 23.4279 61.4854 21.1335 61.3936C20.6746 61.3936 20.5828 61.5771 20.5828 61.9442C20.5828 64.1469 20.5828 66.3495 20.5828 68.4603Z"
        className="fill-zinc-900 dark:fill-zinc-100"
      />
      <path
        d="M128.167 92.3636H114L133.833 44V71.6364H148L128.167 120V92.3636Z"
        fill="#F7D94B"
      />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      ></path>
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );
}

export function DangerIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      ></path>
    </svg>
  );
}

export const FacebookIcon = (props: IconType) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    className={props.className}
    height="100%"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const InstagramIcon = (props: IconType) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    className={props.className}
    height="100%"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const PhoneIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

export const LocationIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

export const SecurityIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
    />
  </svg>
);

export const RocketIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
);

export const PuzzleIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
    />
  </svg>
);

export const HandshakeIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
    />
  </svg>
);

export const LightBulbIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18a2.25 2.25 0 00-2.25 2.25M12 9.75a.75.75 0 100-1.5.75.75 0 000 1.5zm3.75-.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-7.5 0a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12.75a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
    />
  </svg>
);

export const TargetIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

export const TelescopeIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

export const ChartIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 010 1.686M11.25 22.25l1.306-1.306M2.25 18l8.773 8.773.773-.773.773-.773M13.5 2.25L22.5 11.25M15 8.25L20.25 2.25"
    />
  </svg>
);

export const LightningIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    />
  </svg>
);

export const RefreshIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);

export const GlobeIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
    />
  </svg>
);

export const MobileIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  </svg>
);

export const CloudIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
    />
  </svg>
);

export const GearIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export const PaintIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
    />
  </svg>
);

export const BuildIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={props.className}
    height="100%"
    width="100%"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
);
