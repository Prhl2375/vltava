<div class="grid">
    <div class="grid-row">
        <x-product-card />
        <x-product-card />
        <x-product-card />
        <x-product-card />
    </div>
    <div class="grid-row">
        <x-product-card />
        <x-product-card />
        <x-product-card />
        <x-product-card />
    </div>
</div>
@push('styles')
    @vite('resources/sass/components/grid.scss')
@endpush
