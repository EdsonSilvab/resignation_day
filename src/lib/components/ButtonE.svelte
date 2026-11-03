<div class="buttonBody">
    <div class="buttonE">
    <p>E</p>
</div>
</div>

<style>
.buttonBody {
    position: absolute;
    cursor: none;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 9999;
}

@keyframes pulsar {
    0% {
        filter: brightness(1);
    }

    50% {
        filter: brightness(1.2);
    }

    100% {
        filter: brightness(1);
    }
}

.buttonE {
    position: relative;
    top: 210px;
    font-size: 11px;
    padding: 65%;
    color: whitesmoke;
    background-color: #6391db;
    border: 1px solid #fff;

    box-shadow:
        4px 0 0 #fff,
        -4px 0 0 #fff,
        0 4px 0 #fff,
        0 -4px 0 #fff;
    
        animation: pulsar 1.5s ease-in-out infinite;
}
</style>