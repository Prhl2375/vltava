<div class="vltava-grid">
    @foreach($products as $product)
        <x-vltava-product-card :product="$product"/>
    @endforeach
</div>
@push('styles')
    @vite('resources/sass/components/vltava-grid.scss')
@endpush
