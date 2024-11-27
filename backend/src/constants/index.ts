export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;

export const CLOUDINARY_REGEX =
  /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video|raw)\/)?(?:(upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;

export const ENGLISH_NUMBERS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
  "Twenty",
  "Twenty-One",
  "Twenty-Two",
  "Twenty-Three",
  "Twenty-Four",
  "Twenty-Five",
  "Twenty-Six",
  "Twenty-Seven",
  "Twenty-Eight",
  "Twenty-Nine",
  "Thirty",
];

export const REFERRAL_CODE_PATH_WITH_SLASH = "/admin/referral-coupon-code";

export const DARK_LOGO_PUBLIC_URL = `https://dart-mist.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdu1fpl9ph%2Fimage%2Fupload%2Fv1715758563%2Fdart%2Fxagkclhvvc5e14hurx1l.jpg&w=128&q=75`;

export const FAVICON_LOGO_PUBLIC_URL = DARK_LOGO_PUBLIC_URL;

export const imagePrefix = `https://res.cloudinary.com/dg3fkrz9h/image/upload`;

export const propertyTypeArr = ["Plot", "Flat", "House"] as const;
export const bhkArr = ["1 BHK", "2 BHK", "3 BHK", "3+ BHK"] as const;
export const propertyForArr = ["Sell", "Rent"] as const;
export const mediaTypeArr = ["image", "video"] as const;

// 50km= 50/111 (deg) , 1 deg = 111 km
export const propertySearchDistance = 0.45045045; //50 Km

export const scheduleTypeArr = ["In_Person", "Video_Chat"] as const;


export const webName = "Aapna_Makaan";