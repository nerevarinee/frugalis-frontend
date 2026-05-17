<script>
	import { resolve } from '$app/paths';
	export let listing;
</script>

<a href={resolve(`/listings/${listing._id}`)} class="card">
	<img src={listing.images[0]} alt={listing.title} />
	<div class="info">
		<h3>{listing.name}</h3>
		<p class="price">DZD{listing.price}</p>
		<p class="meta">{listing.size} · {listing.condition}</p>
		<p class="seller">by {listing.seller.username}</p>
	</div>
</a>

<style>
	.card {
		display: block;
		text-decoration: none;
		color: inherit;

		border: 2px solid black;
		border-radius: 2px;
		overflow: hidden;

		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
		font-family: 'Jaldi', sans-serif;
	}

	.card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.card img {
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		display: block;
	}

	.info {
		padding: 0.75rem;
	}

	.info h3 {
		font-size: 0.95rem;
		font-weight: 500;
		margin: 0 0 0.25rem 0;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.price {
		font-size: 0.9rem;
		font-weight: 600;
		margin: 0 0 0.25rem 0;
	}

	.meta,
	.seller {
		font-size: 0.75rem;
		opacity: 0.7;
		margin: 0;
	}

	@media (max-width: 768px) {
		.info {
			padding: 0.4rem 0.5rem;
		}
		.info h3 {
			font-size: 0.8rem;
		}
		.price {
			font-size: 0.75rem;
		}
		.meta,
		.seller {
			font-size: 0.65rem;
		}
	}
</style>
