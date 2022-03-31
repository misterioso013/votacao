import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import logo from '../../public/votaai.svg';

export default function Header() {
    return(
        <header>
            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    <li>
                        <Link href="/">
                            <a>
                                <Image src={logo} alt="Votaai logo"
                                width="150"
                                />
                            </a>
                        </Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link href="/">
                        <a className={styles.menu_item_link}><FontAwesomeIcon icon={faHome} /> <span className={styles.menu_item_text}>Página Inicial</span></a>
                        </Link>
                        </li>
                    <li className={styles.menu_item}>
                        <Link href="/create">
                        <a className={styles.menu_item_link}><FontAwesomeIcon icon={faSquarePlus} /> <span className={styles.menu_item_text}>Criar Enquete</span></a>
                        </Link>
                        </li>
                    <li className={styles.menu_item}>
                        <Link href="/my">
                        <a className={styles.menu_item_link}><FontAwesomeIcon icon={faSquarePollVertical} /> <span className={styles.menu_item_text}>Minhas Enquetes</span></a>
                        </Link>
                        </li>
                </ul>
            </nav>
        </header>
    );
}