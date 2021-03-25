import { css } from '@emotion/react';

export default css`
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.88;
    font-weight: 500;
  }
  
  h2 {
    margin: 1.75rem 0;
    border-bottom: 1px solid;
    border-color: inherit;
    font-size: 1.5rem;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.375rem;
  }
  
  p {
    line-height: 1.75;
    margin-bottom: .75em;
  }
  
  ul, ol {
    padding-left: 1.25rem;
    > li {
      margin-bottom: 1rem;
      p {
        margin: 0;
      }
      ul, ol {
        margin-top: .25rem;
        li {
          margin-bottom: .25rem
        }
      }
    }
  }
`;
