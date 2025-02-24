@extends('layouts.main')
@section('title')
    Vltava
@endsection
@section('content')
    <section class="hero">
        @include('components.vltava-banner')
    </section>
    <div class="container">
        <x-vltava-separator>
            <h3>DA СМАЧНО!</h3>
        </x-vltava-separator>
        <x-vltava-grid />
        <x-vltava-separator>
            <x-vltava-button>
                Більше страв
            </x-vltava-button>
        </x-vltava-separator>
        @include('components.vltava-service')
        <x-vltava-separator />
    </div>
@endsection
@push('styles')
    @vite('resources/sass/pages/home.scss')
@endpush
