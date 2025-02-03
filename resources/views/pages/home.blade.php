@extends('layouts.main')
@section('title')
    Vltava
@endsection
@section('content')
    <section>
        @include('components.banner')
    </section>
    <section class="container">
        <x-separator title="DA СМАЧНО!" />
        <x-grid />
    </section>
@endsection
@push('styles')
    @vite('resources/sass/pages/home.scss')
@endpush
