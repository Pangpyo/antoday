import React from 'react';
import styles from './HomeKeyWordsCompany.module.css'

const HomeKeyWordsCompany = () => {
    return ( 
        <div className={styles.companyContainer}>
            <div className={styles.logoImageContainer}>
                <img className={styles.logoImage} src="#" alt='image'  />
            </div>
            <div className={styles.companyName}>기업이름</div>
        </div>
    );
}

export default HomeKeyWordsCompany;