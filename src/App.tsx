import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import reduxLogo from './assets/redux.svg'
import tailwindLogo from './assets/tailwind.webp'
import heroImg from './assets/hero.png'
import './App.css'
import { Counter } from './components/Counter'

function App() {
    return (
        <>
            <section id="center">
                <div className="hero">
                    <img
                        src={heroImg}
                        className="base"
                        width="170"
                        height="179"
                        alt=""
                    />
                    <img
                        src={reactLogo}
                        className="framework"
                        alt="React logo"
                    />
                    <img src={viteLogo} className="vite" alt="Vite logo" />
                </div>
                <div>
                    <h1 data-testid="heading">Get started</h1>
                    <p data-testid="description">
                        Edit <code>src/App.tsx</code> and save to test{' '}
                        <code>HMR</code>
                    </p>
                </div>
                <Counter />
            </section>

            <div className="ticks"></div>

            <section id="next-steps">
                <div id="docs">
                    <svg
                        className="icon"
                        role="presentation"
                        aria-hidden="true"
                    >
                        <use href="/icons.svg#documentation-icon"></use>
                    </svg>
                    <h2 data-testid="documentation">Documentation</h2>
                    <p>Your questions, answered</p>
                    <ul>
                        <li>
                            <a href="https://vite.dev/" target="_blank">
                                <img className="logo" src={viteLogo} alt="" />
                                Explore Vite
                            </a>
                        </li>
                        <li>
                            <a href="https://react.dev/" target="_blank">
                                <img
                                    className="button-icon"
                                    src={reactLogo}
                                    alt=""
                                />
                                Learn more
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://redux-toolkitjs.org"
                                target="_blank"
                            >
                                <img
                                    className="button-icon"
                                    src={reduxLogo}
                                    alt=""
                                />
                                Redux Toolkit
                            </a>
                        </li>
                        <li>
                            <a href="https://tailwindcss.com" target="_blank">
                                <img
                                    className="button-icon"
                                    src={tailwindLogo}
                                    alt=""
                                />
                                Tailwind Css
                            </a>
                        </li>
                    </ul>
                </div>
                <div id="social">
                    <svg
                        className="icon"
                        role="presentation"
                        aria-hidden="true"
                    >
                        <use href="/icons.svg#social-icon"></use>
                    </svg>
                    <h2 data-testid="social">Connect with us</h2>
                    <p>Join the Vite community</p>
                    <ul>
                        <li>
                            <a
                                href="https://github.com/vitejs/vite"
                                target="_blank"
                            >
                                <svg
                                    className="button-icon"
                                    role="presentation"
                                    aria-hidden="true"
                                >
                                    <use href="/icons.svg#github-icon"></use>
                                </svg>
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="https://chat.vite.dev/" target="_blank">
                                <svg
                                    className="button-icon"
                                    role="presentation"
                                    aria-hidden="true"
                                >
                                    <use href="/icons.svg#discord-icon"></use>
                                </svg>
                                Discord
                            </a>
                        </li>
                        <li>
                            <a href="https://x.com/vite_js" target="_blank">
                                <svg
                                    className="button-icon"
                                    role="presentation"
                                    aria-hidden="true"
                                >
                                    <use href="/icons.svg#x-icon"></use>
                                </svg>
                                X.com
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://bsky.app/profile/vite.dev"
                                target="_blank"
                            >
                                <svg
                                    className="button-icon"
                                    role="presentation"
                                    aria-hidden="true"
                                >
                                    <use href="/icons.svg#bluesky-icon"></use>
                                </svg>
                                Bluesky
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            <div className="ticks"></div>
            <section id="spacer"></section>
        </>
    )
}

export default App
