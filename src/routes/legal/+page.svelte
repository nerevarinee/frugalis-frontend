<!-- Svelte-like single file component (HTML representation) -->
<!-- TERMS OF SERVICE PAGE - BRUTALIST BLACK & WHITE + FULL SCROLL DOCUMENT + i18n -->

<script lang="ts">
	let lang: string = 'en';

	const sections: Array<{ id: string; label: Record<string, string> }> = [
		{ id: 'intro', label: { en: 'Introduction', fr: 'Introduction', ar: 'مقدمة' } },
		{ id: 'acceptance', label: { en: 'Acceptance', fr: 'Acceptation', ar: 'القبول' } },
		{ id: 'platform', label: { en: 'Platform', fr: 'Plateforme', ar: 'المنصة' } },
		{ id: 'accounts', label: { en: 'Accounts', fr: 'Comptes', ar: 'الحسابات' } },
		{ id: 'listings', label: { en: 'Listings', fr: 'Annonces', ar: 'الإعلانات' } },
		{ id: 'auctions', label: { en: 'Auctions', fr: 'Enchères', ar: 'المزادات' } },
		{ id: 'messaging', label: { en: 'Messaging', fr: 'Messagerie', ar: 'الرسائل' } },
		{ id: 'ratings', label: { en: 'Ratings', fr: 'Évaluations', ar: 'التقييمات' } },
		{ id: 'payments', label: { en: 'Payments', fr: 'Paiements', ar: 'المدفوعات' } },
		{ id: 'shipping', label: { en: 'Shipping', fr: 'Livraison', ar: 'الشحن' } },
		{ id: 'verification', label: { en: 'Verification', fr: 'Vérification', ar: 'التحقق' } },
		{ id: 'liability', label: { en: 'Liability', fr: 'Responsabilité', ar: 'المسؤولية' } },
		{ id: 'algeria', label: { en: 'Law', fr: 'Droit', ar: 'القانون' } }
	];

	function setLang(l: string) {
		lang = l;
		document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
	}
</script>

<div class="layout">
	<!-- SIDEBAR -->
	<div class="sidebar">
		<div class="logo">TERMS</div>

		<div class="lang-switch">
			<button on:click={() => setLang('en')}>EN</button>
			<button on:click={() => setLang('fr')}>FR</button>
			<button on:click={() => setLang('ar')}>AR</button>
		</div>

		{#each sections as s (s.id)}
			<div
				class="nav-item"
				role="button"
				tabindex="0"
				on:click={() => document.getElementById(s.id)?.scrollIntoView()}
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') document.getElementById(s.id)?.scrollIntoView();
				}}
			>
				{s.label[lang]}
			</div>
		{/each}
	</div>

	<!-- CONTENT -->
	<div class="content">
		<section id="intro">
			<h1>{lang === 'en' ? 'Introduction' : lang === 'fr' ? 'Introduction' : 'مقدمة'}</h1>
			<p>
				{lang === 'en'
					? 'This platform is a peer-to-peer marketplace enabling users to buy and sell goods. It operates as a neutral intermediary and does not take ownership of items listed.'
					: ''}
				{lang === 'fr'
					? 'Cette plateforme est une marketplace pair-à-pair permettant l’achat et la vente entre utilisateurs sans intervention directe sur les biens.'
					: ''}
				{lang === 'ar'
					? 'هذه المنصة سوق يربط بين المستخدمين لبيع وشراء السلع دون امتلاكها أو التدخل المباشر.'
					: ''}
			</p>
		</section>

		<section id="acceptance">
			<h1>
				{lang === 'en'
					? 'Acceptance of Terms'
					: lang === 'fr'
						? 'Acceptation des conditions'
						: 'قبول الشروط'}
			</h1>
			<p>
				{lang === 'en'
					? 'By using this platform, you agree to these terms in full. If you do not agree, you must stop using the service immediately.'
					: ''}
				{lang === 'fr'
					? 'En utilisant la plateforme, vous acceptez pleinement ces conditions. Sinon, vous devez cesser d’utiliser le service.'
					: ''}
				{lang === 'ar'
					? 'باستخدام المنصة، أنت توافق على جميع الشروط. إذا لم توافق، يجب التوقف عن الاستخدام.'
					: ''}
			</p>
		</section>

		<section id="platform">
			<h1>
				{lang === 'en' ? 'Platform Role' : lang === 'fr' ? 'Rôle de la plateforme' : 'دور المنصة'}
			</h1>
			<p>
				{lang === 'en'
					? 'The platform provides listing, discovery, messaging, and optional payment integration via third-party providers such as Chargily. It does not intervene in user agreements.'
					: ''}
				{lang === 'fr'
					? 'La plateforme fournit des services de mise en relation et de paiement via des tiers sans intervenir dans les accords.'
					: ''}
				{lang === 'ar'
					? 'توفر المنصة خدمات العرض والتواصل والدفع عبر أطراف خارجية دون التدخل في الاتفاقات.'
					: ''}
			</p>
		</section>

		<section id="accounts">
			<h1>
				{lang === 'en'
					? 'Accounts & Identity'
					: lang === 'fr'
						? 'Comptes et identité'
						: 'الحسابات والهوية'}
			</h1>
			<p>
				{lang === 'en'
					? 'Sellers are identified using phone numbers. Verification does not guarantee trustworthiness but reduces impersonation risk.'
					: ''}
				{lang === 'fr'
					? 'Les vendeurs sont identifiés par numéro de téléphone. La vérification ne garantit pas la fiabilité.'
					: ''}
				{lang === 'ar' ? 'يتم التعرف على البائعين عبر أرقام الهاتف دون ضمان كامل للمصداقية.' : ''}
			</p>
		</section>

		<section id="listings">
			<h1>{lang === 'en' ? 'Listings' : lang === 'fr' ? 'Annonces' : 'الإعلانات'}</h1>
			<p>
				{lang === 'en'
					? 'Users are fully responsible for the accuracy of listings, including price, condition, and availability.'
					: ''}
				{lang === 'fr'
					? 'Les utilisateurs sont responsables des informations publiées dans leurs annonces.'
					: ''}
				{lang === 'ar' ? 'المستخدمون مسؤولون عن دقة المعلومات في الإعلانات.' : ''}
			</p>
		</section>

		<section id="auctions">
			<h1>{lang === 'en' ? 'Auctions' : lang === 'fr' ? 'Enchères' : 'المزادات'}</h1>
			<p>
				{lang === 'en'
					? 'Auction bids are considered binding between users. The platform does not enforce payments or guarantee fulfillment.'
					: ''}
				{lang === 'fr'
					? 'Les enchères sont contraignantes entre utilisateurs sans garantie dexécution par la plateforme.'
					: ''}
				{lang === 'ar' ? 'المزايدات ملزمة بين المستخدمين دون ضمان من المنصة.' : ''}
			</p>
		</section>

		<section id="messaging">
			<h1>{lang === 'en' ? 'Messaging' : lang === 'fr' ? 'Messagerie' : 'الرسائل'}</h1>
			<p>
				{lang === 'en'
					? 'Messaging is provided for communication only. The platform is not responsible for content shared between users.'
					: ''}
				{lang === 'fr'
					? 'La messagerie est uniquement pour la communication entre utilisateurs.'
					: ''}
				{lang === 'ar' ? 'الرسائل للتواصل فقط والمنصة غير مسؤولة عن المحتوى.' : ''}
			</p>
		</section>

		<section id="ratings">
			<h1>{lang === 'en' ? 'Ratings' : lang === 'fr' ? 'Évaluations' : 'التقييمات'}</h1>
			<p>
				{lang === 'en'
					? 'Ratings reflect user opinions and may not be verified. Abuse or manipulation of ratings may lead to restrictions.'
					: ''}
				{lang === 'fr' ? 'Les évaluations reflètent des opinions non vérifiées.' : ''}
				{lang === 'ar' ? 'التقييمات تعبر عن آراء المستخدمين وقد يتم إساءة استخدامها.' : ''}
			</p>
		</section>

		<section id="payments">
			<h1>{lang === 'en' ? 'Payments' : lang === 'fr' ? 'Paiements' : 'المدفوعات'}</h1>
			<p>
				{lang === 'en'
					? 'Payments may be processed via Chargily API or external methods. The platform does not act as escrow.'
					: ''}
				{lang === 'fr'
					? 'Les paiements passent par Chargily ou d’autres services externes sans escrow.'
					: ''}
				{lang === 'ar' ? 'تتم المدفوعات عبر Chargily أو وسائل خارجية دون ضمان وسيط.' : ''}
			</p>
		</section>

		<section id="shipping">
			<h1>{lang === 'en' ? 'Shipping' : lang === 'fr' ? 'Livraison' : 'الشحن'}</h1>
			<p>
				{lang === 'en'
					? 'Shipping is entirely managed between users. The platform is not responsible for delays, loss, or damage.'
					: ''}
				{lang === 'fr' ? 'La livraison est gérée entre utilisateurs uniquement.' : ''}
				{lang === 'ar' ? 'الشحن يتم بين المستخدمين فقط والمنصة غير مسؤولة.' : ''}
			</p>
		</section>

		<section id="verification">
			<h1>{lang === 'en' ? 'Verification' : lang === 'fr' ? 'Vérification' : 'التحقق'}</h1>
			<p>
				{lang === 'en'
					? 'Verification improves trust signals but does not guarantee authenticity or behavior.'
					: ''}
				{lang === 'fr' ? 'La vérification améliore la confiance sans garantie absolue.' : ''}
				{lang === 'ar' ? 'التحقق يزيد الثقة لكنه لا يضمن السلوك أو المصداقية.' : ''}
			</p>
		</section>

		<section id="liability">
			<h1>
				{lang === 'en'
					? 'Limitation of Liability'
					: lang === 'fr'
						? 'Limitation de responsabilité'
						: 'تحديد المسؤولية'}
			</h1>
			<p>
				{lang === 'en'
					? 'The platform is not responsible for disputes, losses, fraud, or damages between users.'
					: ''}
				{lang === 'fr' ? 'La plateforme n’est pas responsable des litiges entre utilisateurs.' : ''}
				{lang === 'ar' ? 'المنصة غير مسؤولة عن النزاعات أو الخسائر بين المستخدمين.' : ''}
			</p>
		</section>

		<section id="algeria">
			<h1>
				{lang === 'en'
					? 'Governing Law (Algeria)'
					: lang === 'fr'
						? 'Droit algérien'
						: 'القانون الجزائري'}
			</h1>
			<p>
				{lang === 'en' ? 'These terms are governed by the laws of Algeria.' : ''}
				{lang === 'fr' ? 'Ces conditions sont régies par le droit algérien.' : ''}
				{lang === 'ar' ? 'تخضع هذه الشروط للقانون الجزائري.' : ''}
			</p>
		</section>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, sans-serif;
		background: white;
		color: black;
	}

	html {
		scroll-behavior: smooth;
	}

	.layout {
		display: flex;
	}

	.sidebar {
		position: fixed;
		width: 260px;
		height: 100vh;
		border-right: 3px solid black;
		padding: 20px;
		overflow-y: auto;
	}

	.logo {
		font-weight: 900;
		font-size: 20px;
		border: 3px solid black;
		padding: 10px;
		margin-bottom: 15px;
		text-transform: uppercase;
	}

	.lang-switch button {
		border: 2px solid black;
		background: white;
		margin-right: 5px;
		cursor: pointer;
		font-weight: bold;
		padding: 5px;
	}

	.nav-item {
		border: 2px solid black;
		padding: 8px;
		margin-top: 8px;
		cursor: pointer;
		font-weight: bold;
	}

	.nav-item:hover {
		background: black;
		color: white;
	}

	.content {
		margin-left: 280px;
		padding: 40px;
		max-width: 900px;
	}

	section {
		border-bottom: 3px solid black;
		padding: 40px 0;
	}

	h1 {
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	p {
		line-height: 1.6;
		font-size: 15px;
	}
</style>
