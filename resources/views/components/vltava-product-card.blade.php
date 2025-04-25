<a href="#" class="vltava-product-card">
    <div class="vltava-product-card-content">
        <img src="{{ asset('images/genericFood.jpeg') }}" alt="" class="vltava-product-card-image">
        <h3 class="vltava-product-card-title">{{$product['name']}}</h3>
        <div class="vltava-product-card-description">
            {{$product['description']}}
        </div>
        <div class="vltava-product-card-button">
            {{$product['price']}}
        </div>
    </div>
</a>
@push('styles')
    @vite('resources/sass/components/vltava-product-card.scss')
@endpush
