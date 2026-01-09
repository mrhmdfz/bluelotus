export default function Footer() {
  return (
    <footer>
      <p className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BlueLotus by{" "}
        <a
          href="https://github.com/mrhmdfz"
          className="text-cyan-700 hover:text-cyan-500 transition-all duration-300"
        >
          mrhmdfz
        </a>
      </p>
    </footer>
  );
}
