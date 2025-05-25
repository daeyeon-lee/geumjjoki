describe('소셜로그인 → 토큰 만료 → 토큰 갱신 확인', () => {
  before(() => {
    // 테스트 계정이 없다면 백엔드에서 미리 생성해두세요.
    // 또는 beforeEach에서 회원가입 API를 호출해도 됩니다.
  });

  beforeEach(() => {
    // 소셜로그인(테스트 계정 로그인)
    cy.socialLogin();
  });

  it('access token 만료 후 refresh로 자동 갱신되는지 확인', () => {
    cy.window().then((win) => {
      expect(win.localStorage.getItem('access_token')).to.exist;
      expect(win.localStorage.getItem('refresh_token')).to.exist;
    });

    cy.window().then((win) => {
      win.localStorage.setItem('access_token', 'expired_token');
    });

    // 실제 앱 페이지를 띄움 (예: 홈)
    cy.visit('/');

    // 앱의 JS 컨텍스트에서 fetch로 API 호출 (axios도 가능)
    cy.window().then((win) => {
      return (win as any).apiClient.get('/auth/user/')
        .then((response: any) => {
          cy.window().then((win) => {
            const newAccessToken = win.localStorage.getItem('access_token');
            expect(newAccessToken).to.not.equal('expired_token');
            expect(newAccessToken).to.exist;
          });
        });
    });
  });
});
