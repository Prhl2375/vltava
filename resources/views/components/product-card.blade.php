<div class="product-card">
    <img src="{{ asset('images/genericFood.jpeg') }}" alt="" class="product-card-image">
    <h3 class="product-card-title">Product</h3>
    <div class="product-card-description">
        - includes <br>
        - tasty <br>
        - something <br>
        Вага: як мама ярика
    </div>
    <div class="product-card-button">
        price$
    </div>
</div>
@push('styles')
    @vite('resources/sass/components/product-card.scss')
@endpush
