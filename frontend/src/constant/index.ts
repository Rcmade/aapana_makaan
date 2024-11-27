export const webName = "AapnaMakaan";

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

export const CLOUDINARY_REGEX =
  /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video|raw)\/)?(?:(upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;

  export const currentFormStateSearchParams = "current-form-state"

  export const propertyFormStorageKey = "property-form";

  export const svgMarker = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C11.5146 23.728 11.5142 23.7277 11.5142 23.7277L11.5115 23.7259L11.505 23.7216L11.4826 23.7064C11.4634 23.6934 11.4359 23.6746 11.4007 23.6502C11.3303 23.6015 11.2289 23.5303 11.101 23.4379C10.8451 23.2531 10.4825 22.9831 10.0487 22.6376C9.18242 21.9478 8.02509 20.9515 6.86479 19.7268C4.57998 17.315 2.125 13.8517 2.125 10C2.125 7.38099 3.1654 4.86924 5.01732 3.01732C6.86924 1.1654 9.38099 0.125 12 0.125C14.619 0.125 17.1308 1.1654 18.9827 3.01732C20.8346 4.86924 21.875 7.38099 21.875 10C21.875 13.8517 19.42 17.315 17.1352 19.7268C15.9749 20.9515 14.8176 21.9478 13.9513 22.6376C13.5175 22.9831 13.1549 23.2531 12.899 23.4379C12.7711 23.5303 12.6697 23.6015 12.5993 23.6502C12.5641 23.6746 12.5366 23.6934 12.5174 23.7064L12.495 23.7216L12.4885 23.7259L12.4865 23.7273C12.4865 23.7273 12.4854 23.728 12 23ZM12 23L12.4854 23.728C12.1915 23.924 11.8081 23.9237 11.5142 23.7277L12 23Z" fill="#D85151"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.875C8 7.7349 9.7349 6 11.875 6C14.0151 6 15.75 7.7349 15.75 9.875C15.75 12.0151 14.0151 13.75 11.875 13.75C9.7349 13.75 8 12.0151 8 9.875Z" fill="white"/></svg>`;
