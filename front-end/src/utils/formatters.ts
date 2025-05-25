/**
 * 일반 문자열에서 HTML 태그를 포함한 문자열을 실제 HTML로 변환하는 함수
 *
 * @param text HTML 태그가 포함된 문자열
 * @returns 태그가 적용된 HTML 문자열
 */
export function formatHtml(text: string): string {
  if (!text) return '';
  return text;
}

/**
 * 일반 텍스트의 줄바꿈(\n)을 <br> 태그로 변환하는 함수
 *
 * @param text 줄바꿈이 포함된 문자열
 * @returns <br> 태그가 적용된 HTML 문자열
 */
export function formatLineBreaks(text: string): string {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}

/**
 * URL을 감지하여 클릭 가능한 링크로 변환하는 함수
 *
 * @param text URL이 포함된 문자열
 * @returns 링크가 적용된 HTML 문자열
 */
export function formatLinks(text: string): string {
  if (!text) return '';
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
}

/**
 * 이모지 코드(:emoji:)를 실제 이모지로 변환하는 함수
 *
 * @param text 이모지 코드가 포함된 문자열
 * @returns 이모지가 적용된 문자열
 */
export function formatEmoji(text: string): string {
  if (!text) return '';

  // 간단한 이모지 매핑 (필요에 따라 확장)
  const emojiMap: Record<string, string> = {
    ':smile:': '😊',
    ':laugh:': '😄',
    ':cry:': '😢',
    ':heart:': '❤️',
    ':thumbsup:': '👍',
    ':warning:': '⚠️'
  };

  return text.replace(/:([\w-]+):/g, (match) => {
    return emojiMap[match] || match;
  });
}

/**
 * 모든 포매팅을 적용하는 통합 함수
 *
 * @param text 포매팅할 원본 문자열
 * @returns 모든 포매팅이 적용된 HTML 문자열
 */
export function formatText(text: string): string {
  if (!text) return '';

  let formattedText = text;
  formattedText = formatEmoji(formattedText);
  formattedText = formatLinks(formattedText);
  formattedText = formatLineBreaks(formattedText);

  return formattedText;
}

/**
 * HTML 문자열을 안전하게 렌더링하기 위한 함수
 * Vue에서 v-html 디렉티브와 함께 사용할 수 있음
 *
 * @example <div v-html="sanitizeHtml(content)"></div>
 *
 * @param html HTML 문자열
 * @returns 안전한 HTML 문자열
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  // 기본적인 XSS 방지 (필요에 따라 더 강화할 수 있음)
  const sanitized = html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  // 허용할 태그만 다시 변환
  return sanitized
    .replace(/&lt;br&gt;/g, '<br>')
    .replace(/&lt;a href="([^"]+)" target="_blank" rel="noopener noreferrer"&gt;([^<]+)&lt;\/a&gt;/g,
      (_, url, text) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
}


// email 형식 검사
export function validateEmail(email: string): boolean {
  // {example}@{example}.{example}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


// 비밀번호 형식 검사
// 문자, 숫자 특수문자 포함 8~20자
export function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/;
  // console.log(password)
  // console.log(passwordRegex.test(password))
  return passwordRegex.test(password);
}

// 비밀번호 일치 검사
export function validatePasswordConfirm(password: string, passwordConfirm: string): boolean {
  return password === passwordConfirm;
}