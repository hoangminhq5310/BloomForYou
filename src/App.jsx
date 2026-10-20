import { useEffect, useMemo, useState } from 'react'
import {
  Flower2, Heart, Sparkles, Gift, Music2, VolumeX, Menu, X, Copy,
  Download, RefreshCw, Send, Check, Leaf, Sun, ChevronDown
} from 'lucide-react'

const wishes = [
  'Iu em nhất con nợn của anhhhh 💗',
  'Chúc em hôm lào cũm iu anh nhứt😘',
  'Chúc em được đi tơi nhìu nơi mí anh Q',
  'Chúc em xớm nên Tô ki ô 🌷',
  'Chúc em tập nuyện thể zục thể thao để a khum gọi e nà con nợn nứa',
  'Iu em iu em Iu emmmmm 💕',
]
const flowers = ['🌷', '🌸', '🌼', '🌺', '🪻', '🌻', '💐', '🌹']
const petals = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 5) % 100}%`,
  delay: `${(i % 7) * -1.7}s`,
  duration: `${8 + (i % 6) * 2}s`,
  size: `${10 + (i % 4) * 5}px`,
}))

function App() {
  const [activeTab, setActiveTab] = useState('garden')
  const [recipient, setRecipient] = useState('Em yêu')
  const [sender, setSender] = useState('Người thương')
  const [message, setMessage] = useState('Cảm ơn em vì đã luôn ở bên cạnh anh. Chúc em ngày 20/10 thật nhiều niềm vui, luôn xinh đẹp và hạnh phúc nhé! ❤️')
  const [style, setStyle] = useState('pastel')
  const [bloomCount, setBloomCount] = useState(0)
  const [currentWish, setCurrentWish] = useState(wishes[0])
  const [toast, setToast] = useState('')
  const [musicOn, setMusicOn] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('to')) setRecipient(params.get('to'))
    if (params.get('from')) setSender(params.get('from'))
    if (params.get('msg')) setMessage(params.get('msg'))
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(id)
  }, [toast])

  const themeClass = `theme-${style}`
  const encodedLink = useMemo(() => {
    const params = new URLSearchParams({ to: recipient, from: sender, msg: message })
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`
  }, [recipient, sender, message])

  function bloom() {
    setBloomCount(n => n + 1)
    setCurrentWish(wishes[Math.floor(Math.random() * wishes.length)])
  }

  async function shareCard() {
    try {
      if (navigator.share) {
        await navigator.share({ title: `Lời chúc gửi ${recipient}`, text: message, url: encodedLink })
      } else {
        await navigator.clipboard.writeText(encodedLink)
        setToast('Đã sao chép link thiệp! Gửi cho người ấy nhé 💌')
      }
    } catch (e) {
      if (e.name !== 'AbortError') setToast('Không thể chia sẻ tự động. Hãy sao chép link nhé!')
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(encodedLink)
      setToast('Đã sao chép link thiệp vào clipboard 💗')
    } catch {
      setToast('Trình duyệt không cho phép sao chép tự động. Hãy copy link trên thanh địa chỉ.')
    }
  }

  function downloadCard() {
    const content = `🌷 BLOOM FOR YOU — 20/10 🌷\n\nGửi ${recipient},\n\n${message}\n\n— ${sender}\n\nChúc mừng Ngày Phụ nữ Việt Nam!`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `loi-chuc-20-10-${recipient.trim().replace(/\s+/g, '-') || 'yeu-thuong'}.txt`
    a.click()
    URL.revokeObjectURL(url)
    setToast('Đã tải lời chúc về máy 🌸')
  }

  const navItems = [
    { id: 'garden', label: 'Khu vườn', icon: Flower2 },
    { id: 'create', label: 'Tạo thiệp', icon: Gift },
    { id: 'wishes', label: 'Lời chúc', icon: Heart },
  ]

  return (
    <div className={`app-shell ${themeClass}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <button className="brand" onClick={() => setActiveTab('garden')} aria-label="Về trang chủ">
          <span className="brand-mark"><Flower2 size={25} strokeWidth={1.8} /></span>
          <span>Bloom <i>for You</i><small>GỬI YÊU THƯƠNG · 20/10</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-link ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
              <Icon size={16} />{label}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <button className={`icon-button ${musicOn ? 'active' : ''}`} onClick={() => { setMusicOn(!musicOn); setToast(musicOn ? 'Đã tắt chế độ nhạc 🎵' : 'Đã bật biểu tượng nhạc 🎵 (bản demo chưa phát âm thanh)') }} aria-label="Bật hoặc tắt nhạc">
            {musicOn ? <Music2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button className="heart-button" onClick={() => { setLiked(!liked); setToast(liked ? 'Đã bỏ lưu yêu thích' : 'Đã lưu khoảnh khắc yêu thương 💖') }} aria-label="Yêu thích">
            <Heart size={19} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Mở menu">{mobileMenu ? <X /> : <Menu />}</button>
        </div>
      </header>

      {mobileMenu && <div className="mobile-nav">{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setActiveTab(id); setMobileMenu(false) }}><Icon size={17}/>{label}</button>)}</div>}

      <main>
        {activeTab === 'garden' && (
          <>
            <section className="hero">
              <div className="floating-petals" aria-hidden="true">{petals.map((p, i) => <span key={i} style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, fontSize: p.size }}>{i % 3 === 0 ? '✿' : '♡'}</span>)}</div>
              <div className="hero-copy">
                <div className="eyebrow"><Sparkles size={14}/> MỘT NGÀY THẬT ĐẶC BIỆT <Sparkles size={14}/></div>
                <h1>Chúc mừng ngày<br/><em>Phụ nữ Việt Nam</em></h1>
                <div className="date-mark"><span /> 20 . 10 <span /></div>
                <p className="hero-lead">Một lời chúc, một bông hoa,<br/>để em luôn đẹp và hạnh phúc!</p>
                <button className="primary-button" onClick={bloom}><Flower2 size={19}/> Nhấn để hoa nở <span className="button-sparkle">✦</span></button>
                <p className="microcopy">Mỗi lần chạm là một điều ngọt ngào ✿</p>
              </div>
              <div className="hero-illustration" aria-label="Minh họa khu vườn hoa">
                <div className="sun-glow" />
                <div className="hill hill-back" />
                <div className="hill hill-front" />
                {Array.from({ length: 19 }, (_, i) => <span key={i} className={`garden-flower gf-${i % 6}`} style={{ left: `${(i * 17 + 2) % 100}%`, bottom: `${8 + (i % 4) * 5}%`, animationDelay: `${i * .13}s` }}>{flowers[i % flowers.length]}</span>)}
                <div className="garden-note"><span>Hoa nở vì</span><span>những điều</span><span>tuyệt vời</span><Heart size={15}/></div>
                <div className="butterfly butterfly-one">🦋</div>
                <div className="butterfly butterfly-two">🦋</div>
              </div>
              {bloomCount > 0 && <div className="bloom-counter"><Flower2 size={15}/> Bạn đã làm nở {bloomCount} bông hoa</div>}
            </section>

            <section className="wish-section">
              <div className="section-heading"><div><span className="section-kicker">LỜI NHẮN DÀNH RIÊNG CHO EM</span><h2>Một chút dịu dàng <em>gửi đến em</em></h2></div><span className="heading-flower">✿</span></div>
              <div className="wish-card">
                <div className="quote-mark">“</div>
                <p>{currentWish}</p>
                <div className="wish-signature">— Gửi em, cô gái tuyệt vời <span>♡</span></div>
                <button className="soft-button" onClick={bloom}><RefreshCw size={15}/> Một lời chúc khác</button>
                <span className="card-flower flower-a">✿</span><span className="card-flower flower-b">❀</span>
              </div>
            </section>
            <section className="feature-strip">
              <Feature icon={<Flower2/>} title="Hoa nở tương tác" text="Chạm để khu vườn rực rỡ hơn."/>
              <Feature icon={<Heart/>} title="Lời chúc ngọt ngào" text="Những lời nhắn nhỏ, yêu thương to."/>
              <Feature icon={<Gift/>} title="Thiệp của riêng em" text="Tạo một món quà mang dấu ấn riêng."/>
            </section>
            <section className="cta-panel"><div className="cta-flower">🌷</div><div><span className="section-kicker">GÓI GHÉM YÊU THƯƠNG</span><h2>Tạo một tấm thiệp <em>chỉ dành cho em</em></h2><p>Viết điều bạn muốn nói, để ngày hôm nay trở nên đáng nhớ hơn.</p></div><button className="primary-button" onClick={() => setActiveTab('create')}>Tạo thiệp ngay <Send size={16}/></button></section>
          </>
        )}

        {activeTab === 'create' && (
          <section className="create-layout">
            <div className="create-intro"><span className="section-kicker">MADE WITH LOVE ♡</span><h1>Tạo thiệp <em>của riêng em</em></h1><p>Đôi khi, những lời giản dị nhất lại là món quà đáng nhớ nhất.</p><div className="tiny-flowers">🌷 🌸 🌼</div></div>
            <div className="create-grid">
              <form className="editor-card" onSubmit={e => { e.preventDefault(); setToast('Thiệp đã được cập nhật! Hãy xem bản xem trước bên cạnh 💌') }}>
                <h2><span className="step-number">01</span> Viết lời yêu thương</h2>
                <label htmlFor="recipient">Tên người nhận <span>*</span></label>
                <input id="recipient" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Ví dụ: Em yêu" maxLength={50} required/>
                <label htmlFor="sender">Tên người gửi</label>
                <input id="sender" value={sender} onChange={e => setSender(e.target.value)} placeholder="Ví dụ: Người thương" maxLength={50}/>
                <label htmlFor="message">Lời nhắn của bạn <span>*</span></label>
                <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} maxLength={500} rows={5} required placeholder="Có điều gì bạn muốn nói với người ấy?"/>
                <div className="character-count">{message.length}/500 ký tự</div>
                <label>Chọn phong cách thiệp</label>
                <div className="theme-picker">
                  {[['pastel','🌸','Pastel'],['garden','🌿','Garden'],['sunset','🌅','Sunset']].map(([id, emoji, label]) => <button type="button" key={id} className={`theme-option ${style === id ? 'selected' : ''}`} onClick={() => setStyle(id)}><span>{emoji}</span>{label}</button>)}
                </div>
                <button type="submit" className="primary-button full-button"><Sparkles size={17}/> Cập nhật thiệp</button>
              </form>
              <div className="preview-column">
                <div className="preview-label"><span><Sparkles size={15}/> XEM TRƯỚC THIỆP</span><span>LIVE PREVIEW</span></div>
                <div className={`greeting-card card-${style}`}>
                  <div className="card-top-flower">✿</div><div className="card-small">GỬI ĐẾN NGƯỜI ĐẶC BIỆT</div>
                  <div className="card-ornament">❧ ❀ ❧</div>
                  <h2>Chúc mừng<br/><em>Ngày Phụ nữ Việt Nam</em></h2>
                  <div className="card-date">20 / 10</div>
                  <div className="card-divider"><span>♡</span></div>
                  <p className="card-to">Gửi <strong>{recipient || 'người thương'}</strong>,</p>
                  <p className="card-message">{message || 'Lời nhắn yêu thương của bạn sẽ xuất hiện ở đây.'}</p>
                  <div className="card-bouquet">💐</div>
                  <p className="card-from">Thương gửi, <strong>{sender || 'Người thương'}</strong> ♡</p>
                  <div className="card-bottom">BLOOM FOR YOU · 20.10</div>
                </div>
                <div className="preview-actions"><button className="soft-button" onClick={shareCard}><Send size={15}/> Chia sẻ thiệp</button><button className="soft-button" onClick={copyLink}><Copy size={15}/> Sao chép link</button><button className="soft-button" onClick={downloadCard}><Download size={15}/> Tải lời chúc</button></div>
                <p className="preview-hint"><Heart size={13}/> Link thiệp sẽ lưu tên người nhận và lời nhắn để người ấy mở ra đọc.</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'wishes' && (
          <section className="wishes-page">
            <div className="create-intro"><span className="section-kicker">WORDS FROM THE HEART</span><h1>Những lời chúc <em>ngọt ngào</em></h1><p>Chọn một lời chúc, gửi đến cô gái khiến thế giới của bạn dịu dàng hơn.</p></div>
            <div className="wishes-grid">{wishes.map((wish, i) => <article className="wish-tile" key={wish}><div className={`tile-icon tile-${i % 4}`}>{flowers[i]}</div><p>{wish}</p><button onClick={() => { setMessage(wish); setActiveTab('create'); setToast('Đã thêm lời chúc vào thiệp của bạn 💌') }}>Dùng lời chúc này <span>↗</span></button></article>)}</div>
          </section>
        )}
      </main>

      <footer className="footer"><div className="footer-brand"><Flower2 size={18}/> Bloom <em>for You</em></div><p>Gửi yêu thương, để mỗi ngày đều là một ngày đặc biệt.</p><div className="footer-bottom">Được làm bằng <Heart size={12} fill="currentColor"/> dành riêng cho ngày 20/10 <span>✿</span></div></footer>
      {toast && <div className="toast" role="status"><Check size={17}/>{toast}</div>}
    </div>
  )
}

function Feature({ icon, title, text }) {
  return <article className="feature-card"><div className="feature-icon">{icon}</div><div><h3>{title}</h3><p>{text}</p></div><span className="feature-sparkle">✧</span></article>
}

export default App
