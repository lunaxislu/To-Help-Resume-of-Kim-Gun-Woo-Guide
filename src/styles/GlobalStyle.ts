import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root {
    /* Typography */
    /* Font Size */
    --fontSize-body : 1.6rem; // 16px
    
    --fontSize-H1 : 2.4rem; // 24px
    --fontSize-H2 : 2.2rem; // 22px
    --fontSize-H3 : 2rem; // 20px
    --fontSize-H4 : 1.8rem; // 18px
    --fontSize-H5 : 1.4rem; // 14px
    --fontSize-H6 : 1.2rem; // 12px

    /* Font Weight */
    --fontWeight-bold: 700;
    --fontWeight-semiBold: 600;
    --fontWeight-medium: 500; /* 기본 굵기 */
    --fontWeight-regular: 400; /* 모바일에서 쓰임 */

    /* 어두운 배경색 */
    --bgColor : #131313;

    /* Primary Color 투명도 */
    --opc-100: #DBFF00; /* 100% 쨍한 연두 - 활성화 된 버튼(등록버튼) */
    --opc-90: #dbff0090;
    --opc-80: #dbff0080;
    --opc-70: #dbff0070;
    --opc-60: #dbff0060;
    --opc-50: #dbff0050;
    --opc-40: #dbff0040;
    --opc-30: #dbff0030;
    --opc-20: #dbff0020;
    --opc-10: #dbff0010; /* 탁한 녹색 - 활성화 안 된 버튼 */

    /* gray scale */
    --1-gray : #0b0b0b; /* 블랙 */
    --2-gray : #191919; 
    --3-gray : #2c2c2c; /* 인풋창, 네브바, 검색창 */
    --4-gray : #444444; 
    --5-gray : #5a5a5a; 
    --6-gray : #717171; 
    --7-gray : #9d9d9d; 
    --8-gray : #b6b6b6; /* 작은 글씨 - 컨텐츠 */
    --9-gray : #cccccc; 
    --10-gray : #e2e2e2; 
    --11-gray : #f8f8f8; /* 전체적인 글씨 - 큰(제목) 글씨 */
    --12-gray : #FFFFFF; /* 화이트 */

    /*!사용법! {color: var(--primary-color)}*/
}

@font-face {
    font-family: 'Pretendard-Light';
    src: url('/fonts/Pretendard-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
}
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('/fonts/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
@font-face {
    font-family: 'Pretendard-Medium';
    src: url('/fonts/Pretendard-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
}
@font-face {
    font-family: 'Pretendard-SemiBold';
    src: url('/fonts/Pretendard-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
}
@font-face {
    font-family: 'Pretendard-Bold';
    src: url('/fonts/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
}


html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
    

}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
    font-size: 1.6rem;
    background-color: var(--1-gray);
    font-family: 'Pretendard-Medium';
    color: var(--11-gray);
    overflow-x: hidden;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

html {
    font-size: 62.5%;
}

* {
    padding: 0;
    margin: 0 ;
    box-sizing: border-box;

}
`;
