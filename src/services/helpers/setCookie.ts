type Props = {
  expires: Date | number | string;
}

type CookieData = {
  name: string;
  props: Props;
  value: number | string;
}

export const setCookie = (cookieData: CookieData) => {
  const {
    name,
    props,
  } = cookieData;
  let { value } = cookieData;
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp instanceof Date) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName as keyof Props];
    if (propValue) {
      updatedCookie += `=${propValue.toString()}`;
    }
  }

  document.cookie = updatedCookie;
};
