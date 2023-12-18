import { useEffect } from "react";
import { Scrollbar } from "swiper/modules";
import { useTranslation } from "react-i18next";
import Swiper from "swiper";
import { Element, Link } from "react-scroll";
import "./App.scss";

export function App() {
  const { t, i18n } = useTranslation();

  function handleSome(e: any) {
    e.preventDefault();

    e.currentTarget.parentElement.classList.toggle("language-select--active");
  }
  function handleToggleLang() {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  }

  function handleToggleMenu(e: any) {
    e.preventDefault();
    const headerNav = document.querySelector(".header__nav") as HTMLElement;

    e.currentTarget.classList.toggle("burger--active");
    headerNav.classList.toggle("header__nav--active");
  }

  function handleToggleFaq(e: any) {
    e.preventDefault();

    e.currentTarget.classList.toggle("faq-item--active");
  }

  function startTimer() {
    const timer = document.querySelector(".timer");

    if (timer) {
      const timerDay = timer.querySelector(".js-timer-day") as HTMLElement,
        timerHours = timer.querySelector(".js-timer-hours") as HTMLElement,
        timerMins = timer.querySelector(".js-timer-mins") as HTMLElement,
        timerSec = timer.querySelector(".js-timer-sec") as HTMLElement;
      // timerLine = timer.querySelector(".js-timer-progress");

      const countdownDate = new Date("December 31, 2023 23:59:59").getTime();

      const countdownInterval = setInterval(function () {
        const now = new Date().getTime();

        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerDay.innerHTML = days.toString();
        timerHours.innerHTML = hours.toString();
        timerMins.innerHTML = minutes.toString();
        timerSec.innerHTML = seconds.toString();

        if (distance < 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
  }

  useEffect(() => {
    const burger = document.querySelector(".burger");
    const headerNav = document.querySelector(".header__nav");

    if (burger && headerNav) {
      const navLinkArray = document.querySelectorAll(".nav__link");

      if (navLinkArray.length) {
        navLinkArray.forEach((navLink) => {
          navLink.addEventListener("click", () => {
            burger.classList.remove("burger--active");
            headerNav.classList.remove("header__nav--active");
          });
        });
      }
    }

    startTimer();

    const languageSelect = document.querySelector(".language-select") as HTMLElement;

    document.addEventListener("click", (e: any) => {
      if (!e.target.closest(".language-select")) {
        languageSelect.classList.remove("language-select--active");
      }
    });

    // Swiper initialization
    const sliderScrollbar = {
      el: ".slider-scrollbar",
      dragClass: "slider-scrollbar__drag",
      draggable: true,
    };

    const partnersSlider = new Swiper(".js-partners-slider", {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      loopPreventsSliding: false,
      loopAdditionalSlides: 3,
      breakpoints: {
        769: {
          slidesPerView: "auto",
          spaceBetween: 86,
          centeredSlides: false,
          loop: false,
        },
      },
    });

    const roadmapSlider = new Swiper(".js-roadmap-slider", {
      slidesPerView: "auto",
      spaceBetween: 20,
      scrollbar: sliderScrollbar,
      modules: [Scrollbar],
    });

    const teamSlider = new Swiper(".js-team-slider", {
      slidesPerView: "auto",
      spaceBetween: 20,
      scrollbar: sliderScrollbar,
      modules: [Scrollbar],
    });

    return () => {
      partnersSlider.destroy();
      roadmapSlider.destroy();
      teamSlider.destroy();
    };
  }, []);

  return (
    <div className="page-wrapper">
      <header className="page-wrapper__header header">
        <div className="header__wrapper">
          <div className="container">
            <div className="header__row">
              <div className="header__logo logo">
                <picture>
                  <source media="(max-width: 768px)" srcSet="assets/images/logo-small.svg" />
                  <source media="(min-width: 769px)" srcSet="assets/images/logo.svg" />
                  <img className="logo__img" src="assets/images/logo.svg" />
                </picture>
              </div>

              <div className="header__nav">
                <nav className="nav">
                  <ul className="nav__list">
                    <li className="nav__item">
                      <Link to="Roadmap" smooth className="nav__link">
                        {t("Roadmap")}
                      </Link>
                    </li>
                    <li className="nav__item">
                      <Link to="Tokenomics" smooth className="nav__link">
                        {t("Tokenomics")}
                      </Link>
                    </li>
                    <li className="nav__item">
                      <Link to="FAQ" smooth className="nav__link">
                        {t("FAQ")}
                      </Link>
                    </li>
                    <li className="nav__item">
                      <Link to="Contact" smooth className="nav__link">
                        {t("Contact")}
                      </Link>
                    </li>
                    <li className="nav__item">
                      <Link to="Whitepaper" smooth className="nav__link">
                        {t("Whitepaper")}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="header__burger">
                <a href="#" onClick={handleToggleMenu} className="burger">
                  <span className="burger__item" />
                  <span className="burger__item" />
                  <span className="burger__item" />
                </a>
              </div>

              <div className="header__buttons">
                <div className="language-select">
                  <a href="#" onClick={handleSome} className="language-select__current">
                    {i18n.language === "ru" ? (
                      <>
                        <img src="assets/images/flags/ru.svg" alt="" className="language-select__icon" />
                        <p className="text text--white text--middle">RUS</p>
                      </>
                    ) : (
                      <>
                        <img src="assets/images/flags/us.svg" alt="" className="language-select__icon" />
                        <p className="text text--white text--middle">ENG</p>
                      </>
                    )}
                  </a>

                  <div onClick={handleToggleLang} className="language-select__list">
                    <a href="#" className="language-select__item">
                      {i18n.language !== "ru" ? (
                        <>
                          <img src="assets/images/flags/ru.svg" alt="" className="language-select__icon" />
                          <p className="text text--white text--middle">Русский</p>
                        </>
                      ) : (
                        <>
                          <img src="assets/images/flags/us.svg" alt="" className="language-select__icon" />
                          <p className="text text--white text--middle">Английский</p>
                        </>
                      )}
                    </a>
                  </div>
                </div>

                <a href="#" className="button button--buy">
                  <span className="button__text"> {t("Buy now")} </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="page-wrapper__content content">
        <div className="hero">
          <div className="hero__wrapper">
            <div className="container">
              <div className="hero__grid">
                <div className="hero__block">
                  <div className="hero__header">
                    <h1 className="hero__title">{t("FlexiMine")}</h1>
                    <p className="hero__subtitle">{t("Mining, Staking, AI")}</p>
                  </div>
                  <div className="hero__text">
                    <p>{t("Experience the best of both worlds - distributed cloud mining of all cryptocurrencies with the help of artificial intelligence.")}</p>
                  </div>
                  <div className="hero__info">
                    <div className="hero__buttons">
                      <a href="#" className="hero__button button button--transparent button--base">
                        <svg className="button__icon button__icon--blue">
                          <use xlinkHref="assets/images/sprite.svg#raphael_paper" />
                        </svg>
                        {t("Whitepaper")}
                      </a>
                      <a href="#" className="hero__button button button--transparent button--base">
                        <svg className="button__icon button__icon--pink">
                          <use xlinkHref="assets/images/sprite.svg#scan" />
                        </svg>
                        {t("KYC")}
                      </a>
                      <a href="#" className="hero__button button button--transparent button--base">
                        <svg className="button__icon button__icon--purple">
                          <use xlinkHref="assets/images/sprite.svg#audit" />
                        </svg>
                        {t("Audit")}
                      </a>
                    </div>
                    <div className="hero__label">
                      <p className="text text--base text--purple text--center">{t("Your individual mining power bonus will be calculated at the conclusion of the presale.")}</p>
                    </div>
                  </div>
                  <div className="hero__video">
                    <div className="video">
                      <div className="video__wrapper">
                        <a href="#" className="video__button">
                          {" "}
                        </a>
                        <video />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hero__timer">
                  <div className="hero-timer">
                    <div className="hero-timer__wrapper">
                      <div className="hero-timer__label">{t("$FXM Pre-Sale")}</div>
                      <div className="hero-timer__header">
                        <div className="timer">
                          <div className="timer__header">
                            <div className="timer__item">
                              <p className="timer__number js-timer-day">10</p>
                              <p className="timer__text">{t("day")}</p>
                            </div>
                            <div className="timer__item">
                              <p className="timer__number js-timer-hours">0</p>
                              <p className="timer__text">{t("hrs")}</p>
                            </div>
                            <div className="timer__item">
                              <p className="timer__number js-timer-mins">0</p>
                              <p className="timer__text">{t("mins")}</p>
                            </div>
                            <div className="timer__item">
                              <p className="timer__number js-timer-sec">0</p>
                              <p className="timer__text">{t("sec")}</p>
                            </div>
                          </div>
                          <div className="timer__line timer-line">
                            <div className="timer-line__header">
                              <p className="timer-line__text">{t("Phase 1 of 12")}</p>
                            </div>
                            <div className="timer-line__wrapper">
                              <div className="timer-line__row js-timer-progress" />
                            </div>
                            <div className="timer-line__footer">
                              <p className="timer-line__text">{t("Until Price Increase")}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hero-timer__content">
                        <ul className="hero-timer__list">
                          <li className="hero-timer__list-item">
                            <p className="hero-timer__title">{t("USDT RAISED:")}</p>
                            <p className="hero-timer__text">$0 / $5,000,000</p>
                          </li>
                          <li className="hero-timer__list-item">
                            <p className="hero-timer__title">{t("Your purchased FXM:")}</p>
                            <p className="hero-timer__text">0</p>
                          </li>
                          <li className="hero-timer__list-item">
                            <p className="hero-timer__title">{t("Your Eternal Power Add-on:")}</p>
                            <p className="hero-timer__text">0</p>
                          </li>
                        </ul>
                      </div>
                      <div className="hero-timer__footer">
                        <a href="#" className="hero-timer__button hero-timer__button--big hero-timer__button--black">
                          <span>1 FXM</span> = $0.01
                        </a>
                        <a href="#" className="hero-timer__button">
                          <img src="assets/images/icons/eth.png" className="icon" alt="" />
                          ETH
                        </a>
                        <a href="#" className="hero-timer__button">
                          <img src="assets/images/icons/usdt.png" className="icon" alt="" />
                          USDT
                        </a>
                        <div className="hero-timer__input hero-input">
                          <div className="hero-input__header">
                            <p className="text text--middle text--grey">{t("Pay with ETH")}</p>
                            <p className="text text--middle text--grey">{t("Max")}</p>
                          </div>
                          <div className="hero-input__item">
                            <input type="text" defaultValue={0} className="hero-input__tag" />
                            <img src="assets/images/icons/eth.png" alt="" className="hero-input__icon" />
                          </div>
                        </div>
                        <div className="hero-timer__input hero-input">
                          <div className="hero-input__header">
                            <p className="text text--middle text--grey">{t("Recieve FXM")}</p>
                          </div>
                          <div className="hero-input__item">
                            <input type="text" defaultValue={0} className="hero-input__tag" />
                            <img src="assets/images/icons/fxm.png" alt="" className="hero-input__icon" />
                          </div>
                        </div>
                        <a href="#" className="hero-timer__button hero-timer__button--big hero-timer__button--blue">
                          {t("Connect wallet")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="partners">
          <div className="partners__wrapper">
            <div className="container">
              <div className="partners__header">
                <p className="partners__title">{t("FEATURED IN:")}</p>
              </div>
              <div className="partners__content">
                <div className="js-partners-slider partners-slider swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide partners-slider__item">
                      <img src="assets/images/partners/1.svg" className="partners-slider__img" alt="" />
                    </div>
                    <div className="swiper-slide partners-slider__item">
                      <img src="assets/images/partners/2.svg" className="partners-slider__img" alt="" />
                    </div>
                    <div className="swiper-slide partners-slider__item">
                      <img src="assets/images/partners/3.svg" className="partners-slider__img" alt="" />
                    </div>
                    <div className="swiper-slide partners-slider__item">
                      <img src="assets/images/partners/4.svg" className="partners-slider__img" alt="" />
                    </div>
                    <div className="swiper-slide partners-slider__item">
                      <img src="assets/images/partners/5.svg" className="partners-slider__img" alt="" />
                    </div>
                    <div className="swiper-slide partners-slider__item">
                      <img src="assets/images/partners/6.svg" className="partners-slider__img" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="section section-what">
          <div className="section__wrapper section__wrapper--what">
            <div className="container">
              <div className="section-what__wrapper">
                <div className="section-what__content">
                  <div className="section__header">
                    <p className="title title--base title--white">
                      <span className="title title--base title--grey">{t("What is")}</span> FlexiMine
                    </p>
                  </div>

                  <div className="section__content">
                    <p className="text text--middle text--white">{t(`FlexiMine provides you with the tools to make your cryptocurrency assets work for you. Our platform offers both staking and mining capabilities in one place, allowing you to increase earnings and enhance your investments. Utilize the power of AI to automatically select the most profitable assets for mining or choose to mine a specific currency manually. Instant access to mining and staking, as well as the ability to withdraw earned funds at any time, makes FlexiMine the perfect choice for those seeking flexibility and efficiency.`)}</p>
                  </div>

                  <div className="section__footer">
                    <p className="text text--middle text--gradient">{t("FlexiMine: Mastery of Mining and Staking at Your Command")}</p>
                  </div>
                </div>

                <div className="section-what__img">
                  <img src="assets/images/what/what-img.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-start">
          <div className="section__wrapper">
            <div className="container">
              <div className="section__header">
                <h2 className="title title--base title--white title--center">{t("How to Start")}</h2>
                <p className="text text--middle text--gradient text--center">{t("Your Path to Cryptocurrency Mining and Staking")}</p>
              </div>
              <div className="section__content">
                <div className="start">
                  <div className="start__grid">
                    <div className="start-item">
                      <div className="start-item__wrapper">
                        <div className="start-item__header">
                          <img src="assets/images/start/1.png" alt="" className="start-item__img" />
                        </div>
                        <div className="start-item__content">
                          <p className="text text--middle text--white">{t("With FlexiMine, starting mining and staking becomes easier than ever. Open the door to the world of crypto mining by making a deposit via MetaMask or Bitcoin, which directly translates into mining activity and staking opportunities.")}</p>
                        </div>
                      </div>
                    </div>
                    <div className="start-item">
                      <div className="start-item__wrapper">
                        <div className="start-item__header">
                          <img src="assets/images/start/2.png" alt="" className="start-item__img" />
                        </div>
                        <div className="start-item__content">
                          <p className="text text--middle text--white">{t("Choose which cryptocurrency to mine on your own, or use our AI to maximize profits in stablecoins.")}</p>
                        </div>
                      </div>
                    </div>
                    <div className="start-item">
                      <div className="start-item__wrapper">
                        <div className="start-item__header">
                          <img src="assets/images/start/3.png" alt="" className="start-item__img" />
                        </div>
                        <div className="start-item__content">
                          <p className="text text--middle text--white">{t("FlexiMine gives you unique flexibility in managing your investments, including the complete return of your deposit at your discretion, ensuring the stability of your income and protection of your investments even in volatile market conditions.")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Element name="Roadmap" />

        <section className="section section-roadmap">
          <div className="section__wrapper section__wrapper--roadmap">
            <div className="container">
              <div className="section__header">
                <h2 className="title title--base title--white title--center">
                  <span className="title__desktop">FlexiMine</span> {t("Roadmap")}
                </h2>
              </div>
              <div className="section__content">
                <div className="js-roadmap-slider slider roadmap-slider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide roadmap-slider__item roadmap-item">
                      <div className="roadmap-item__wrapper">
                        <div className="roadmap-item__header">
                          <p className="title title--small title--white">Q4 2023</p>
                        </div>
                        <div className="roadmap-item__content">
                          <ul className="roadmap-list">
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Start active development of FlexiMine's mobile and desktop applications.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Launch a comprehensive marketing campaign to increase brand awareness.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Expand the team of developers and marketers to support the platform's growth.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Strengthen and optimize the platform's infrastructure in anticipation of scaling services.")}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide roadmap-slider__item roadmap-item">
                      <div className="roadmap-item__wrapper">
                        <div className="roadmap-item__header">
                          <p className="title title--small title--white">Q1 2024</p>
                        </div>
                        <div className="roadmap-item__content">
                          <ul className="roadmap-list">
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Official release of FlexiMine's mobile and desktop applications.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Completion of the presale phase and opening of the platform for deposits and staking.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Enabling the feature for users to withdraw mined funds.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Implementation of marketing campaigns involving influencers and active promotion on social media.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Introduction of intelligent AI algorithms to enhance multi-mining.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Expansion of the customer support team to ensure a high level of service.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Listing of the FXM token on leading centralized cryptocurrency exchanges (CEX).")}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide roadmap-slider__item roadmap-item">
                      <div className="roadmap-item__wrapper">
                        <div className="roadmap-item__header">
                          <p className="title title--small title--white">Q2 2024</p>
                        </div>
                        <div className="roadmap-item__content">
                          <ul className="roadmap-list">
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Intensification of marketing efforts focused on demonstrating successful mining and staking use cases.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Development of partnerships with major cloud mining providers.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Strategic partnership with key cryptocurrency exchanges to increase FXM token liquidity.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Launch of loyalty programs and referral systems to stimulate community growth.")}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide roadmap-slider__item roadmap-item">
                      <div className="roadmap-item__wrapper">
                        <div className="roadmap-item__header">
                          <p className="title title--small title--white">Q3 2024</p>
                        </div>
                        <div className="roadmap-item__content">
                          <ul className="roadmap-list">
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Optimization of staking functionality on the FlexiMine platform.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Conducting educational webinars and master classes for users.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Improvement of analytics tools for tracking mining and staking results.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Planning and preparation for the platform's expansion into new markets.")}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide roadmap-slider__item roadmap-item">
                      <div className="roadmap-item__wrapper">
                        <div className="roadmap-item__header">
                          <p className="title title--small title--white">Q4 2024</p>
                        </div>
                        <div className="roadmap-item__content">
                          <ul className="roadmap-list">
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Implementation of new features and improvements in mobile and desktop applications.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Expansion of the platform's geographic presence in new markets.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Implementation of advanced measures for the protection of user assets.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Integration with additional blockchain platforms and DeFi projects.")}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide roadmap-slider__item roadmap-item">
                      <div className="roadmap-item__wrapper">
                        <div className="roadmap-item__header">
                          <p className="title title--small title--white">Q1 2025</p>
                        </div>
                        <div className="roadmap-item__content">
                          <ul className="roadmap-list">
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Launch of new tools for staking a variety of cryptocurrencies.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Implementation of automatic reinvestment features for mining revenues.")}</p>
                            </li>
                            <li className="roadmap-list__item">
                              <p className="text text--middle text--white">{t("Expansion of the network of strategic partnerships to strengthen the platform.")}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="slider-scrollbar" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Element name="Tokenomics" />

        <section className="section section-tokenomics">
          <div className="section__wrapper section__wrapper--tokenomics">
            <div className="container">
              <div className="section__header">
                <h2 className="title title--base title--white title--center">{t("Tokenomics")}</h2>
                <div className="section__subtitle">
                  <p className="text text--middle text--white text--center">{t("FlexiMine's tokenomics are designed to ensure long-term sustainability and investment appeal while simultaneously fostering active participation and community support. The token distribution is as follows:")}</p>
                </div>
              </div>
              <div className="section__content tokenomics">
                <div className="tokenomics__wrapper">
                  <div className="tokenomics__grid">
                    <div className="tokenomics__block">
                      <ul className="tokenomics-list">
                        <li className="tokenomics-list__item tokenomics-list__item--blue">
                          <p className="tokenomics-list__text">
                            <span>{t("35% (1,400,000,000 tokens) Mining Investments:")}</span>
                            {t("These funds will be utilized to expand and upgrade FlexiMine's mining capacities, including acquiring new equipment and improving infrastructure.")}
                          </p>
                        </li>
                        <li className="tokenomics-list__item tokenomics-list__item--pink">
                          <p className="tokenomics-list__text">
                            <span>{t("25% (1,000,000,000 tokens) Platform Development:")}</span>
                            {t("This portion of tokens is allocated for innovationand technological advancement, ensuring the continuous enhancement of the FlexiMine platform and strengthening its market presence.")}
                          </p>
                        </li>
                        <li className="tokenomics-list__item tokenomics-list__item--purple">
                          <p className="tokenomics-list__text">
                            <span>{t("20% (800,000,000 tokens) Marketing and Partnerships:")}</span>
                            {t("Funds are planned for marketing campaigns and strategic partnerships that will help broaden FlexiMine's reach and attract new users.")}
                          </p>
                        </li>
                        <li className="tokenomics-list__item tokenomics-list__item--blue--deep">
                          <p className="tokenomics-list__text">
                            <span>{t("10% (400,000,000 tokens) Community Engagement:")}</span>
                            {t("Tokens allocated for the community are intended to encourage its activity and reward users for participating in various initiatives and events conducted by FlexiMine.")}
                          </p>
                        </li>
                        <li className="tokenomics-list__item tokenomics-list__item--blue--dark">
                          <p className="tokenomics-list__text">
                            <span>{t("10% (400 million tokens) Reserve Fund:")}</span>
                            {t("This fund is created to ensure the security and stability of the platform, allowing for flexible responses to market condition changes and strengthening the financial robustness of FlexiMine.")}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="tokenomics__circle">
                      <div className="tokenomics-circle">
                        <div className="tokenomics-circle__wrapper">
                          <div className="tokenomics-circle__item">
                            <p className="tokenomics-circle__text">{t("Total Token Supply:")}</p>
                            <p className="tokenomics-circle__title">4 000 000 000</p>
                          </div>
                          <div className="tokenomics-circle__tag tokenomics-circle__tag--blue">{t("Mining Investments")}</div>
                          <div className="tokenomics-circle__tag tokenomics-circle__tag--purple">{t("Marketing and Partnerships")}</div>
                          <div className="tokenomics-circle__tag tokenomics-circle__tag--pink">{t("Platform Development")}</div>
                          <div className="tokenomics-circle__tag tokenomics-circle__tag--blue--deep">{t("Community Engagement")}</div>
                          <div className="tokenomics-circle__tag tokenomics-circle__tag--blue--dark">{t("Reserve Fund")}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tokenomics__footer">
                    <p className="text text--middle text--white">{t("The distribution of FXM tokens reflects FlexiMine's strategy aimed at creating a healthy ecosystem, stimulating growth, and ensuring transparency of operations for all participants. By focusing on both infrastructure development and community interaction, FlexiMine is committed to building a dynamic and thriving platform for cryptocurrency mining.")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-team">
          <div className="section__wrapper section__wrapper--team">
            <div className="container">
              <div className="section__header">
                <h2 className="title title--base title--white title--center">{t("Team & Advisors")}</h2>
                <div className="section__subtitle">
                  <p className="text text--middle text--center text--white">{t("See for yourself that FlexiMine is People-centered and Trustworthy.")}</p>
                  <p className="text text--middle text--center text--white">{t("Understand how our system works. Transparent and Safe.")}</p>
                  <p className="text text--middle text--center text--white">{t("it's about the people in front and their experience and knowledge")}</p>
                </div>
              </div>
              <div className="section__content">
                <div className="js-team-slider slider team-slider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide team-slider__item team-item">
                      <div className="team-item__wrapper">
                        <div className="team-item__header">
                          <div className="team-item__img">
                            <img src="assets/images/team/1.jpg" alt="" />
                          </div>
                          <p className="team-item__title">Артур К.</p>
                          <p className="team-item__position">Директор</p>
                        </div>
                        <div className="team-item__footer">
                          <a href="#" className="social-icon">
                            <svg className="social-icon__img social-icon__img--tg">
                              <use xlinkHref="assets/images/sprite.svg#telegram" />
                            </svg>
                          </a>
                          <a href="#" className="social-icon">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#phone" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide team-slider__item team-item">
                      <div className="team-item__wrapper">
                        <div className="team-item__header">
                          <div className="team-item__img">
                            <img src="assets/images/team/2.jpg" alt="" />
                          </div>
                          <p className="team-item__title">Екатерина С.</p>
                          <p className="team-item__position">Технический аналитик</p>
                        </div>
                        <div className="team-item__footer">
                          <a href="#" className="social-icon">
                            <svg className="social-icon__img social-icon__img--tg">
                              <use xlinkHref="assets/images/sprite.svg#telegram" />
                            </svg>
                          </a>
                          <a href="#" className="social-icon">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#phone" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide team-slider__item team-item">
                      <div className="team-item__wrapper">
                        <div className="team-item__header">
                          <div className="team-item__img">
                            <img src="assets/images/team/3.jpg" alt="" />
                          </div>
                          <p className="team-item__title">Филипп Т.</p>
                          <p className="team-item__position">Руководитель отдела развития и партнерства</p>
                        </div>
                        <div className="team-item__footer">
                          <a href="#" className="social-icon">
                            <svg className="social-icon__img social-icon__img--tg">
                              <use xlinkHref="assets/images/sprite.svg#telegram" />
                            </svg>
                          </a>
                          <a href="#" className="social-icon">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#phone" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide team-slider__item team-item">
                      <div className="team-item__wrapper">
                        <div className="team-item__header">
                          <div className="team-item__img">
                            <img src="assets/images/team/4.jpg" alt="" />
                          </div>
                          <p className="team-item__title">Светлана С.</p>
                          <p className="team-item__position">Руководитель блокчейна</p>
                        </div>
                        <div className="team-item__footer">
                          <a href="#" className="social-icon">
                            <svg className="social-icon__img social-icon__img--tg">
                              <use xlinkHref="assets/images/sprite.svg#telegram" />
                            </svg>
                          </a>
                          <a href="#" className="social-icon">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#phone" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide team-slider__item team-item">
                      <div className="team-item__wrapper">
                        <div className="team-item__header">
                          <div className="team-item__img">
                            <img src="assets/images/team/1.jpg" alt="" />
                          </div>
                          <p className="team-item__title">Артур К.</p>
                          <p className="team-item__position">Директор</p>
                        </div>
                        <div className="team-item__footer">
                          <a href="#" className="social-icon">
                            <svg className="social-icon__img social-icon__img--tg">
                              <use xlinkHref="assets/images/sprite.svg#telegram" />
                            </svg>
                          </a>
                          <a href="#" className="social-icon">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#phone" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-scrollbar" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Element name="FAQ" />

        <section className="section">
          <div className="section__wrapper section__wrapper--faq">
            <div className="section__header section__header--margin--big">
              <div className="container">
                <h2 className="title title--base title--white title--center">{t("Frequently Asked Questions")}</h2>
              </div>
            </div>
            <div className="section__content faq">
              <div className="faq__wrapper">
                <div className="container">
                  <div className="faq__content">
                    <ul className="faq__list">
                      <li className="faq-item" onClick={handleToggleFaq}>
                        <a href="#" className="faq-item__header">
                          <p className="faq-item__title">{t("What is FlexiMine?")}</p>
                          <span className="faq-item__icon" />
                        </a>
                        <div className="faq-item__content">
                          <p className="text text--base text--white">{t("FlexiMine is an innovative platform for cryptocurrency mining and staking, combining the advantages of cloud mining with artificial intelligence. Users can choose cryptocurrencies for mining, such as Bitcoin or Dogecoin, and participate in staking. It is also possible to use AI for automatically selecting the most profitable options for mining and staking.")}</p>
                        </div>
                      </li>

                      <li className="faq-item" onClick={handleToggleFaq}>
                        <a href="#" className="faq-item__header">
                          <p className="faq-item__title">{t("How can I buy FXM tokens?")}</p>
                          <span className="faq-item__icon" />
                        </a>
                        <div className="faq-item__content">
                          <p className="text text--base text--white">{t("FXM tokens are available for purchase on our official website fleximine.com using cryptocurrencies such as USDT or Ethereum.")}</p>
                        </div>
                      </li>

                      <li className="faq-item" onClick={handleToggleFaq}>
                        <a href="#" className="faq-item__header">
                          <p className="faq-item__title">{t("What makes FlexiMine unique?")}</p>
                          <span className="faq-item__icon" />
                        </a>
                        <div className="faq-item__content">
                          <p className="text text--base text--white">{t("FlexiMine offers a unique mining opportunity by using any cryptocurrency as mining power under collateral. This innovation is a first in the crypto industry.")}</p>
                        </div>
                      </li>

                      <li className="faq-item" onClick={handleToggleFaq}>
                        <a href="#" className="faq-item__header">
                          <p className="faq-item__title">{t("How does staking work in FlexiMine?")}</p>
                          <span className="faq-item__icon" />
                        </a>
                        <div className="faq-item__content">
                          <p className="text text--base text--white">{t("In FlexiMine, users can stake any cryptocurrency that supports staking, within a unified ecosystem.")}</p>
                        </div>
                      </li>

                      <li className="faq-item" onClick={handleToggleFaq}>
                        <a href="#" className="faq-item__header">
                          <p className="faq-item__title">{t("What are the benefits for FXM presale participants?")}</p>
                          <span className="faq-item__icon" />
                        </a>
                        <div className="faq-item__content">
                          <p className="text text--base text--white">{t("Participants in the presale will receive a lifetime bonus in mining power, which will be individually calculated after the end of the presale.")}</p>
                        </div>
                      </li>

                      <li className="faq-item" onClick={handleToggleFaq}>
                        <a href="#" className="faq-item__header">
                          <p className="faq-item__title">{t("How does FlexiMine ensure security and transparency?")}</p>
                          <span className="faq-item__icon" />
                        </a>
                        <div className="faq-item__content">
                          <p className="text text--base text--white">{t("FlexiMine utilizes state-of-the-art security technologies and provides users with full control over their investments and mining activities.")}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="faq__img">
                    <img src="assets/images/faq/faq-img.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Element name="Contact" />

        <section className="section section-contacts">
          <div className="section__wrapper section__wrapper--contacts">
            <div className="container">
              <div className="section__header">
                <h2 className="title title--base title--white title--center">{t("Our contacts")}</h2>
              </div>
              <div className="section__content contacts">
                <div className="contacts__wrapper">
                  <div className="contacts__grid">
                    <div className="contacts__block">
                      <ul className="contacts-list">
                        <li className="contacts-list__item">
                          <span className="social-icon social-icon--big">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#phone" />
                            </svg>
                          </span>
                          <a href="tel:+79373522775" className="contacts-list__link">
                            +7 937 352-27-75
                          </a>
                          <div className="contacts-list__sublist">
                            <p className="contacts-list__text">Telegram</p>
                            <p className="contacts-list__text">Whatsapp</p>
                            <p className="contacts-list__text">Viber</p>
                          </div>
                        </li>
                        <li className="contacts-list__item">
                          <span className="social-icon social-icon--big">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#email" />
                            </svg>
                          </span>
                          <a href="mailto:FlexiMine@gmail.com" className="contacts-list__link">
                            FlexiMine@gmail.com
                          </a>
                        </li>
                        <li className="contacts-list__item">
                          <span className="social-icon social-icon--big">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#pin" />
                            </svg>
                          </span>
                          <p className="contacts-list__link">
                            г. Москва, м.Красносельская, <br />
                            ул. Гаврикова 2\38
                          </p>
                        </li>
                      </ul>
                      <ul className="social-list">
                        <li className="social-list__item social-list__item--title">
                          <p className="social-list__title">Наши соц сети:</p>
                        </li>
                        <li className="social-list__item">
                          <span className="social-icon">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#vk" />
                            </svg>
                          </span>
                        </li>
                        <li className="social-list__item">
                          <span className="social-icon">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#insta" />
                            </svg>
                          </span>
                        </li>
                        <li className="social-list__item">
                          <span className="social-icon">
                            <svg className="social-icon__img social-icon__img--tg">
                              <use xlinkHref="assets/images/sprite.svg#telegram" />
                            </svg>
                          </span>
                        </li>
                        <li className="social-list__item">
                          <span className="social-icon">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#wa" />
                            </svg>
                          </span>
                        </li>
                        <li className="social-list__item">
                          <span className="social-icon">
                            <svg className="social-icon__img">
                              <use xlinkHref="assets/images/sprite.svg#yt" />
                            </svg>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="contacts__map">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387194.06211117574!2d-74.30931796593632!3d40.697019314047566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2z0J3RjNGOLdCZ0L7RgNC6LCDQodCo0JA!5e0!3m2!1sru!2sru!4v1702519738757!5m2!1sru!2sru" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="footer page-wrapper__footer footer">
        <div className="footer__wrapper">
          <div className="container">
            <div className="footer__row">
              <div className="footer__block">
                <div className="logo footer__logo">
                  <img src="assets/images/logo.svg" alt="" className="logo__img" />
                </div>
                <p className="text text--base text--grey">{t("Copyright 2023 FlexiMine. All Rights Reserved.")}</p>
                <p className="text text--base text--grey">{t("Disclaimer: Cryptocurrency may be unregulated in your jurisdiction. The value of cryptocurrencies may go down as well as up. Profits may be subject to capital gains or other taxes applicable in your jurisdiction.")}</p>
              </div>
              <ul className="footer__list">
                <li>
                  <a href="#" className="text text--base text--grey text--uppercase">
                    {t("PRIVACY POLICY")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text text--base text--grey text--uppercase">
                    {t("COOKIES")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text text--base text--grey text--uppercase">
                    {t("TERMS OF USE")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
