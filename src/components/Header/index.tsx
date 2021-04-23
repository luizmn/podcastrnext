import Link from "next/link";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import styles from "./styles.module.scss"; 

export default function Header() {
    const currentDate = format (new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });
    return (
        <header className={styles.headerContainer}>
            <Link href="/">
            <a><img src="/logo.svg" alt="logomarca" /></a>
            </Link>
            <p> A melhor plataforma de podcasts</p>
            <span>{currentDate}</span>
        </header>
    )
}