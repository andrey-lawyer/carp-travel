          <li key={ind}>
                <Link
                  activeClass="active"
                  to={`section_${ind === 2 ? 0 : ind + 1}`}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  onSetActive={() => setShowModal(false)}
                  className="bg-transparent text-text-white text-lg_modal tracking-[1.8px] cursor-pointer bg-red-500"
                >
                  {item}
                </Link>
              </li>