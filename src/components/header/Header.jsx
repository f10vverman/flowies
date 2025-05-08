import React, { useEffect, useState, useRef } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigation = [
    { label: 'TV Shows', href: 'tv' },
    { label: 'Movies', href: 'movie' },
  ];
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const burgerRef = useRef(null);

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !sidebarRef.current.contains(event.target) && !burgerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (search.trim() !== '') {
      navigate(`search?q=${search}`);
    } else {
      navigate('/');
    }
  }, [search, navigate]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className={styles.container}>
      {/* Бургер-кнопка (только на мобильных) */}
      <div className={styles.burger} onClick={toggleMenu}>
        <div className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLine1Open : ''}`}></div>
        <div className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLine2Open : ''}`}></div>
        <div className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLine3Open : ''}`}></div>
      </div>

      {/* Логотип (виден всегда) */}
      <Link to={'/'} className={styles.logo}>
        <svg width="153" height="23" viewBox="0 0 153 23" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logo__icon_desktop}>
          <path
            d="M10.688 21.968H0.672V0.879999H18.848V7.248H10.688V10.896H18.368V13.424H10.688V21.968ZM37.2423 21.968H19.5463V0.879999H29.5943V15.6H37.2423V21.968ZM50.0158 22.32C48.2451 22.32 46.6024 22.096 45.0878 21.648C43.5944 21.2 42.2931 20.528 41.1838 19.632C40.0744 18.7147 39.2104 17.5733 38.5918 16.208C37.9731 14.8427 37.6638 13.2427 37.6638 11.408C37.6638 9.57333 37.9731 7.97333 38.5918 6.608C39.2104 5.22133 40.0744 4.08 41.1838 3.184C42.2931 2.26667 43.5944 1.584 45.0878 1.136C46.6024 0.687999 48.2451 0.463999 50.0158 0.463999C51.7864 0.463999 53.4184 0.687999 54.9118 1.136C56.4264 1.584 57.7384 2.26667 58.8478 3.184C59.9571 4.08 60.8211 5.22133 61.4398 6.608C62.0584 7.97333 62.3678 9.57333 62.3678 11.408C62.3678 13.2427 62.0584 14.8427 61.4398 16.208C60.8211 17.5733 59.9571 18.7147 58.8478 19.632C57.7384 20.528 56.4264 21.2 54.9118 21.648C53.4184 22.096 51.7864 22.32 50.0158 22.32ZM50.0158 6.928C49.2264 6.928 48.6398 7.344 48.2558 8.176C47.8931 8.98667 47.7118 10.064 47.7118 11.408C47.7118 12.752 47.8931 13.84 48.2558 14.672C48.6398 15.504 49.2264 15.92 50.0158 15.92C50.8051 15.92 51.3811 15.504 51.7438 14.672C52.1278 13.84 52.3198 12.752 52.3198 11.408C52.3198 10.064 52.1278 8.98667 51.7438 8.176C51.3811 7.344 50.8051 6.928 50.0158 6.928ZM66.4955 22L62.7195 0.879999H74.2075L74.9755 11.024H75.4555L77.1835 0.879999H80.4475L82.1755 11.024H82.6555L83.4235 0.879999H94.9115L91.1355 22H80.8315L79.0395 8.784H78.5595L76.7995 22H66.4955ZM105.146 22H95.5775V0.879999H105.146V22ZM120.053 14.96C120.928 14.96 121.771 14.8533 122.581 14.64C123.413 14.4267 124.16 14.192 124.821 13.936C125.589 13.6373 126.315 13.296 126.997 12.912L129.301 20.048C127.808 20.8587 126.176 21.4773 124.405 21.904C122.656 22.3093 120.864 22.512 119.029 22.512C116.747 22.512 114.784 22.256 113.141 21.744C111.52 21.2107 110.187 20.464 109.141 19.504C108.096 18.5227 107.328 17.3387 106.837 15.952C106.347 14.544 106.101 12.9547 106.101 11.184C106.101 9.66933 106.357 8.26133 106.869 6.96C107.403 5.63733 108.171 4.496 109.173 3.536C110.197 2.55467 111.467 1.78667 112.981 1.232C114.496 0.677333 116.245 0.4 118.229 0.4C119.829 0.4 121.28 0.538666 122.581 0.815998C123.883 1.09333 124.992 1.49867 125.909 2.032C126.827 2.56533 127.531 3.22667 128.021 4.016C128.533 4.784 128.789 5.65867 128.789 6.64C128.789 7.92 128.491 8.944 127.893 9.712C127.317 10.4587 126.571 11.0453 125.653 11.472C124.736 11.8773 123.723 12.144 122.613 12.272C121.504 12.4 120.437 12.464 119.413 12.464H116.213C116.32 13.2747 116.661 13.8933 117.237 14.32C117.813 14.7467 118.752 14.96 120.053 14.96ZM119.029 6.704C118.112 6.704 117.429 7.04533 116.981 7.728C116.555 8.38933 116.288 9.27467 116.181 10.384H118.293C119.061 10.384 119.712 10.2453 120.245 9.968C120.779 9.66933 121.045 9.18933 121.045 8.528C121.045 7.97333 120.896 7.536 120.597 7.216C120.299 6.87467 119.776 6.704 119.029 6.704ZM140.477 7.888C140.477 8.4 140.765 8.80533 141.341 9.104C141.917 9.38133 142.631 9.63733 143.485 9.872C144.359 10.0853 145.298 10.32 146.301 10.576C147.325 10.832 148.263 11.1947 149.117 11.664C149.991 12.1333 150.717 12.7627 151.293 13.552C151.869 14.3413 152.157 15.3653 152.157 16.624C152.157 17.6267 151.954 18.4907 151.549 19.216C151.165 19.92 150.631 20.5067 149.949 20.976C149.266 21.424 148.466 21.7547 147.549 21.968C146.631 22.1813 145.661 22.288 144.637 22.288C143.378 22.288 142.258 22.1707 141.277 21.936C140.295 21.68 139.463 21.2853 138.781 20.752C138.119 20.2187 137.607 19.536 137.245 18.704C136.903 17.8507 136.733 16.8267 136.733 15.632H136.285V22H129.949V13.84H137.469C137.682 14.0533 137.927 14.2453 138.205 14.416C138.439 14.5653 138.727 14.704 139.069 14.832C139.431 14.9387 139.847 14.992 140.317 14.992C140.594 14.992 140.882 14.9387 141.181 14.832C141.501 14.7253 141.661 14.512 141.661 14.192C141.661 13.7653 141.373 13.4347 140.797 13.2C140.221 12.9653 139.495 12.7413 138.621 12.528C137.746 12.3147 136.807 12.0907 135.805 11.856C134.802 11.6 133.863 11.248 132.989 10.8C132.114 10.352 131.389 9.76533 130.813 9.04C130.237 8.29333 129.949 7.32267 129.949 6.128C129.949 4.42133 130.599 3.07733 131.901 2.096C133.223 1.09333 135.111 0.591999 137.565 0.591999C140.231 0.591999 142.194 1.12533 143.453 2.192C144.733 3.23733 145.373 4.912 145.373 7.216H145.853V0.879999H152.157V9.008H144.637C144.551 8.58133 144.391 8.19733 144.157 7.856C143.943 7.55733 143.645 7.29067 143.261 7.056C142.877 6.82133 142.365 6.704 141.725 6.704C140.893 6.704 140.477 7.09867 140.477 7.888Z"
            fill="white"
          />
        </svg>
        <svg width="153" height="23" viewBox="0 0 153 23" fill="none" className={styles.logo__icon_mobile}>
          <path d="M10.688 21.968H0.672V0.879999H18.848V7.248H10.688V10.896H18.368V13.424H10.688V21.968ZM37.2423 21.968H19.5463V0.879999H29.5943V15.6H37.2423V21.968ZM..." fill="white" />
        </svg>
      </Link>
      {/* Мобильный поиск */}
      <div className={styles.mobileSearch}>
        <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>
      {/* Боковое меню */}
      <div className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`} ref={sidebarRef}>
        <div className={styles.sidebarContent}>
          <nav className={styles.mobileNav}>
            {navigation.map((nav, index) => (
              <NavLink key={index} to={nav.href} className={styles.mobileNavLink} onClick={toggleMenu}>
                {nav.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.mobilePerson}>
            Profile
          </div>
        </div>
      </div>

      {/* Оверлей для затемнения фона */}
      {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

      {/* Десктопный контент */}
      <div className={styles.desktopContent}>
        <div className={styles.search}>
          <input type="text" placeholder="Search here..." onChange={(e) => setSearch(e.target.value)} value={search} />
        </div>

        <div className={styles.nav_content}>
          <nav>
            {navigation.map((nav, index) => (
              <NavLink key={index} to={nav.href} className={styles.navLink}>
                {nav.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.person}>
          <svg width="30" height="30" viewBox="0 0 144 160" fill="none">
            <path d="M71.88 15.9733C63.4072 15.9733..." fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
