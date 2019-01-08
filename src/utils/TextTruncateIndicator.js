import React from 'react'

export const TextTruncateIndicator = (title, arrayOfText) => {
    let joinnedarrayOfText = arrayOfText.join(",");
    let truncatedText = joinnedarrayOfText.length > 39 ? joinnedarrayOfText.slice(0, 39) + "..." : joinnedarrayOfText;

    return (
        <p onClick={(event) => alert(joinnedarrayOfText)}>
            <b>{title}</b>
            {arrayOfText.length === 0 ? null : <span class="glyphicon glyphicon-plus"></span>}
            {arrayOfText.length === 0 ? "Nenhum" : truncatedText}
        </p>
    );
}