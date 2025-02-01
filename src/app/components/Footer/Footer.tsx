import React from 'react';
import styles from '../Footer/footer.module.scss';


export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}> 
        <div className={styles.email}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src='/image/icons/mail.svg' alt="GitHub" className={styles.icon} />
                mornet.romain2@gmail.com
            </a>
        </div>

        <div className={styles.section}>        
          <ul>
            <li><a href="">About</a></li>
            <li><a href="">Developer</a></li>
            <li><a href="">Designer</a></li>
            <li><a href="">Projects</a></li>
            <li><a href="">Services</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </div>

        <div className={styles.socialNetwork}>
          <ul>
            <li className='relative'>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src='/image/icons/githubHover.svg' alt="GitHub" className={`${styles.iconHover} absolute top-[10px] left-[11px] -z-1 `} />
                <img src='/image/icons/gitHub.svg' alt="GitHub" className={styles.icon} />
                GitHub
              </a>
             
            </li>
           
            <li className='relative'>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src='/image/icons/linkedinHover.svg' alt="GitHub" className={`${styles.iconHover} absolute top-[8px] left-[12px] -z-1 `}/>
                <img src='/image/icons/linkedin.svg' alt="LinkedIn" className={styles.icon} />
                LinkedIn
              </a>
            </li>
            <li className='relative'>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer">
              <img src='/image/icons/behanceHover.svg' alt="GitHub" className={`${styles.iconHover}  absolute top-[19px] left-[12px] -z-1 `} />
                <img src='/image/icons/behance.svg' alt="Behance" className={styles.icon} />
                Behance
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 Romain Mornet. All rights reserved</p>
      </div>
    </footer>
  );
};

