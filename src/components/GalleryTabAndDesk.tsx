  <button
          type="button"
          className="desk:w-[294px] desk:text-right bg-red-500 text-white"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          BACK
        </button>
        <button
          type="button"
          className="desk:w-[294px] desk:text-left bg-red-500 text-white"
          onClick={() => {
            return swiperRef.current?.slideNext();
          }}
        >
          NEXT
        </button>