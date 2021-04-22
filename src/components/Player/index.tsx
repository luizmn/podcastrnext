import styles from "./styles.module.scss" 

export default function Player() {
   
return (
<div className={styles.playerContainer}>
    <header>
        <img src="/playing.svg" alt="playing now" />
        <strong>
            Playing now
        </strong>
    </header>        
    <div className={styles.emptyPlayer}>
        <strong>Select a podcast to listen</strong>
    </div>
    <footer className={styles.empty}>
        <div className={styles.progress}>
            <span>00:00</span>
            <div className={styles.slider} >
                <div className={styles.emptySlider} />
            </div>
            <span>00:00</span>
            <div className={styles.buttons}>
                <button type="button">
                    <img src="/shuffle.svg" alt="Shuffle songs" />
                </button>
                <button type="button">
                    <img src="/play-previous.svg" alt="previous song" />
                </button>
                <button type="button" className={styles.playButton}>
                    <img src="/play.svg" alt="play song" />
                </button>
                <button type="button">
                    <img src="/play-next.svg" alt="next song" />
                </button>
                <button type="button">
                    <img src="/repeat.svg" alt="repeat song" />
                </button>
            </div>
        </div>
    </footer>
</div>
)
}