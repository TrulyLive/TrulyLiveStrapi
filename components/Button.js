import Link from 'next/link'

function Button({ text, link }) {
  if (link === 'submit')
    return (
      <button type="submit" className="rounded-sm text-pureWhite p-2 px-8 bg-gradient-to-r from-grad1 to-grad2">
        {text}
      </button>
    )
  return (
    <Link href={link}>
      <a className="rounded-sm text-pureWhite p-2 px-8 bg-gradient-to-r from-grad1 to-grad2">{text}</a>
    </Link>
  )
}

export default Button
